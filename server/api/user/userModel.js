let mongoose  = require('mongoose');
let Schema    = mongoose.Schema;
let bcrypt    = require('bcrypt');

let UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  authenticate: function(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword: function(plainTextPassword) {
    if (!plainTextPassword) {
      return '';
    } else {
      let salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPassword, salt);
    }
  }
};

module.exports = mongoose.model('user', UserSchema);
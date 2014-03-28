exports.engine = {
  styles: {
    once: true,
    compress: true,
    yuicompress: true
  }
};

exports.mailer = {
  auth: {
    user: "i@bodokaiser.io",
    pass: "n0t3m4rt?"
  },
  service: "gmail"
};

exports.server = {
  ip: process.env.OPENSHIFT_NODEJS_IP,
  port: process.env.OPENSHIFT_NODEJS_PORT
};

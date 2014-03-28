exports.engine = {
  styles: {
    once: true,
    compress: true,
    yuicompress: true
  }
};

exports.mailer = {
  auth: {
    user: "info@example.org",
    pass: "secret"
  },
  service: "gmail"
};

exports.server = {
  ip: process.env.OPENSHIFT_NODEJS_IP,
  port: process.env.OPENSHIFT_NODEJS_PORT
};

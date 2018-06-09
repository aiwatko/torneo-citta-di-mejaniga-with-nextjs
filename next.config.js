const withSass = require('@zeit/next-sass')
module.exports = withSass()

exports.exportPathMap = () => ({
    "/": { page: "/" },
    "/iscrizioni": { page: "/iscrizioni" },
    "/regole": { page: "/regole" },
    "/struttura": { page: "/struttura" },
    "/sponsor": { page: "/sponsor" },
    "/contatti": { page: "/contatti" },
  })
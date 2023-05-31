const express = require("express");

const config = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

module.exports = config;

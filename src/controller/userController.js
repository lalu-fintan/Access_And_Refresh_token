const expressAsyncHandler = require("express-async-handler");
const dataModel = require("../model/dataModel");

const getData = expressAsyncHandler(async (req, res, next) => {
  const data = await dataModel.find();
  if (!data) {
    res.status(400).json("you don't have a  data");
  }
  res.status(200).json(data);
});

const getById = expressAsyncHandler(async (req, res, next) => {
  const data = await dataModel.findById(req.params.id);
  if (!data) {
    res.status(400).json("you don't have this id");
  }
  res.status(200).json(data);
});

const postData = expressAsyncHandler(async (req, res, next) => {
  const { id, title, description } = req.body;
  if (!title || !description) {
    res.status(200).json("title and description required");
  }
  const data = await dataModel.create({
    title,
    description,
  });
  res.status(200).json(data);
});

const updateData = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await dataModel.findById(id);
  if (!data) {
    res.status(400).json("you don't have this id");
  }
  const update = await dataModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(update);
});

const deleteData = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await dataModel.findById(id);
  if (!data) {
    res.status(400).json("you don't have this id");
  }
  const deleteItem = await dataModel.findByIdAndRemove(id, req.body);
  res.status(200).json("data has deleted");
});

module.exports = { getData, getById, postData, updateData, deleteData };

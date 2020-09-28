var express = require("express");
var router = express.Router();
const Task = require("../model/Task");

router.get("/tasks", (req, res) => {
  Task.findAll()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/task", (req, res) => {
  if (!req.body.text) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    Task.create(req.body)
      .then(() => {
        res.send("Task Added");
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
});

router.delete("/task/:id", (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.send("Task Deleted!");
    })
    .catch(err => {
      res.send("Error: " + err);
    });
});

router.delete("/tasks", (req, res) => {
  Task.destroy({
    where: {
      done: req.params.done != false
    }
  })
    .then(() => {
      res.send("Tasks Deleted!");
    })
    .catch(err => {
      res.send(err);
    });
});

router.put("/task/:id", (req, res) => {
  if (!req.body.text) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    Task.update(
      { text: req.body.text, datein: req.body.datein, done: req.body.done },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(() => {
        res.send("Task Updated!");
      })
      .catch(err => res.send(err));
  }
});

router.put("/tasks", (req, res) => {
  Task.update(
    { done: req.body.done },
    {
      where: {}
    }
  )
    .then(() => {
      res.send(req.body.done);
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = router;

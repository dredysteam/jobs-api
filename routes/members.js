const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const members = require('../models/Members');

// GET ALL MEMBERS
router.get('/', (req, res) => {
  res.json(members);
});

// GET MEMBER
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// CREATE MEMBER
router.post('/', (req, res) => {
  console.log(req.body);
  // const postData = JSON.stringify(req.body);
  const { name, email } = req.body;
  const newMember = {
    id: uuid.v4(),
    name: name,
    email: email,
    status: 'active',
  };
  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: 'Please, include a name and email' });
  }
  members.push(newMember);
  res.json(members);
});

// UPDATE MEMBER
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    res.json(
      members.forEach((member) => {
        if (member.id === parseInt(req.params.id)) {
          member.name = updMember.name ? updMember.name : member.name;
          member.email = updMember.email ? updMember.email : member.email;

          res.json({ msg: 'Member updated', member });
        }
      })
    );
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// DELETE MEMBER
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    // const updMember = req.body;
    res.json({ msg: 'Member deleted', members: members.filter((member) => member.id != parseInt(req.params.id)) });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;

const express = require('express');
const Job = require('../models/job');
const router = express.Router();

// GET all jobs
router.get('/getall', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// POST add job
router.post('/addjob', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

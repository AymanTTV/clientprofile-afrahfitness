import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import axios from 'axios';

export default function AddClientForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone_number: '',
    email: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    health_conditions: '',
    medications: '',
    injuries: '',
    fitness_goals: '',
    goal_importance: '',
    challenges: '',
    training_commitment: '',
    current_diet: '',
    sleep_hours: '',
    stress_level: '',
    measurement_date: '',
    weight: '',
    body_fat_percentage: '',
    waist: '',
    hips: '',
    chest: '',
    arms: '',
    thighs: '',
    front_view: '',
    side_view: '',
    back_view: '',
    cardiovascular_test_type: '',
    cardiovascular_result: '',
    upper_body_strength: '',
    lower_body_strength: '',
    flexibility_test: '',
    fitness_goal: '',
    cardio_exercises: '',
    strength_training: '',
    diet_suggestions: '',
    weekly_schedule: '',
    rest_days: '',
    check_in_date: '',
    progress_comments: '',
    client_commitment: '',
    client_signature: '',
    session_notes: '',
    client_feedback: '',
    session_adjustments: '',
    nutrition_tips: '',
    sleep_tips: '',
    stress_management: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://clientprofile.afrahfitness.com/api/add-client.php', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => alert('Client added successfully'))
      .catch(error => console.error('Error adding client:', error));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'orange' }}>
        *Macluumaadka Macmiilka*
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="name"
            label="Magaca"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="age"
            label="Da'da"
            value={formData.age}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="gender"
            label="Jinsiga"
            value={formData.gender}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="phone_number"
            label="Lambarka Telefoonka"
            value={formData.phone_number}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="email"
            label="Cinwaanka Emailka"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="emergency_contact_name"
            label="Magaca Xiriirka Degdegga ah"
            value={formData.emergency_contact_name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="emergency_contact_phone"
            label="Lambarka Telefoonka Degdegga ah"
            value={formData.emergency_contact_phone}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        {/* Health history fields */}
        <Grid item xs={6}>
          <TextField
            name="health_conditions"
            label="Ma leedahay xaalado caafimaad?"
            value={formData.health_conditions}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="medications"
            label="Ma qaadanaysaa daawooyin?"
            value={formData.medications}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="injuries"
            label="Ma leedahay dhaawacyo ama qalliin hore?"
            value={formData.injuries}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        {/* Fitness goals fields */}
        <Grid item xs={6}>
          <TextField
            name="fitness_goals"
            label="Maxay yihiin yoolalkaaga jimicsiga?"
            value={formData.fitness_goals}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="goal_importance"
            label="Maxay tahay sababta uu yoolkani kuu muhiim yahay?"
            value={formData.goal_importance}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        {/* Add more fields as needed */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Ku dar Macmiilka
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

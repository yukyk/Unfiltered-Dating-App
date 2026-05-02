-- UNFILTERED Mock Data Seed

-- Insert Fake Users
insert into users (id, email, name, age, city, plan, realness_score) values
('f2b43bde-7dc4-4d1a-b0f0-3323c14a24f1', 'sara@demo.com', 'Sara', 24, 'New York', 'unfiltered', 55),
('6b2b4e80-d123-41a4-9e32-b7d1979b18b2', 'nadia@demo.com', 'Nadia', 26, 'Chicago', 'unfiltered', 91),
('1b80db26-ee8b-4a57-8ff3-e3bcb60e4dc3', 'layla@demo.com', 'Layla', 22, 'Austin', 'honest', 42),
('9d0e1bba-e62a-43c3-aebe-b92bed0c1694', 'amara@demo.com', 'Amara', 25, 'Seattle', 'unfiltered', 74),
('e913a056-5120-4e2b-be24-dbafbc6bfad9', 'riya@demo.com', 'Riya', 23, 'San Francisco', 'unfiltered', 88);

-- Insert Fake Profiles
insert into profiles (user_id, tagline, layer4_habits, layer5_opinions, layer6_wound, layer7_ask) values
(
  'f2b43bde-7dc4-4d1a-b0f0-3323c14a24f1', 
  'I''ll warn you early — I overthink everything.',
  '{"sleep": "1am–8am", "screentime": "5-6 hrs", "diet": "Mostly vegetarian", "faith": "Daily practice"}',
  null, null, null
),
(
  '6b2b4e80-d123-41a4-9e32-b7d1979b18b2',
  'Silence doesn''t scare me. Shallow does.',
  '{"sleep": "12am–7am", "screentime": "4 hrs", "diet": "Everything", "workout": "Daily"}',
  '{"Honesty without empathy is just cruelty.", "Pineapple belongs on pizza."}',
  'I spent two years trying to be everything for someone who never asked me to. Still learning that''s not love.',
  'Just stay. That''s it. When it gets heavy, stay.'
),
(
  '1b80db26-ee8b-4a57-8ff3-e3bcb60e4dc3',
  'I need someone who reads.',
  null, null, null, null
),
(
  '9d0e1bba-e62a-43c3-aebe-b92bed0c1694',
  'My worst habit is caring too much.',
  '{"sleep": "Random", "diet": "Vegetarian", "workout": "Yoga"}',
  '{"Small talk is a waste of time."}',
  null, null
),
(
  'e913a056-5120-4e2b-be24-dbafbc6bfad9',
  'I laugh too loud. Consider yourself warned.',
  '{"sleep": "11pm–7am", "diet": "Vegan", "screentime": "Too much"}',
  '{"Coffee dates are better than drinks.", "I''d rather be overdressed."}',
  'I pushed away the last person who actually understood me because I was scared of being seen.',
  'Tell me the truth, even when it''s uncomfortable.'
);

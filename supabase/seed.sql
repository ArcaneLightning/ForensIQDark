-- Seed data for ForensIQ application
-- Note: This seed file creates sample data for demonstration purposes
-- In a real application, users would be created through the auth system

-- First, let's create some sample users in the auth.users table
-- (This is a simplified approach for demo purposes)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'alex.johnson@email.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Alex Johnson"}', false, '', '', '', ''),
('550e8400-e29b-41d4-a716-446655440002', 'sarah.chen@email.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Sarah Chen"}', false, '', '', '', ''),
('550e8400-e29b-41d4-a716-446655440003', 'michael.rodriguez@email.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Michael Rodriguez"}', false, '', '', '', '');

-- Sample practice sessions
INSERT INTO practice (user_id, mode, topic, custom_topic, audio_url, practice_time, feedback, created_at) VALUES
-- User 1 practice sessions
('550e8400-e29b-41d4-a716-446655440001', 'impromptu', 'Technology', NULL, 'https://example.com/audio/speech1.mp3', 180, 
 '{"overallScore": 8.5, "categories": {"clarity": 8.7, "confidence": 8.2, "structure": 8.8, "delivery": 8.4}, "suggestions": ["Great use of vocal variety", "Consider adding more specific examples", "Strong opening and conclusion"]}', 
 '2024-06-25 10:30:00'),
('550e8400-e29b-41d4-a716-446655440001', 'prepared', 'Climate Change', NULL, 'https://example.com/audio/speech2.mp3', 300, 
 '{"overallScore": 9.1, "categories": {"clarity": 9.3, "confidence": 8.9, "structure": 9.2, "delivery": 9.0}, "suggestions": ["Excellent research and preparation", "Strong argument structure", "Consider more audience engagement"]}', 
 '2024-06-26 14:15:00'),
('550e8400-e29b-41d4-a716-446655440001', 'debate', 'Education Reform', NULL, 'https://example.com/audio/speech3.mp3', 240, 
 '{"overallScore": 7.8, "categories": {"clarity": 8.0, "confidence": 7.5, "structure": 8.2, "delivery": 7.6}, "suggestions": ["Work on reducing filler words", "Strengthen counter-arguments", "Practice timing more"]}', 
 '2024-06-27 16:45:00'),

-- User 2 practice sessions
('550e8400-e29b-41d4-a716-446655440002', 'impromptu', 'Politics', NULL, 'https://example.com/audio/speech4.mp3', 120, 
 '{"overallScore": 7.2, "categories": {"clarity": 7.5, "confidence": 6.8, "structure": 7.0, "delivery": 7.4}, "suggestions": ["Build confidence through practice", "Work on speech structure", "Consider audience perspective"]}', 
 '2024-06-26 09:20:00'),
('550e8400-e29b-41d4-a716-446655440002', 'prepared', 'Healthcare', NULL, 'https://example.com/audio/speech5.mp3', 360, 
 '{"overallScore": 8.8, "categories": {"clarity": 9.0, "confidence": 8.6, "structure": 8.9, "delivery": 8.7}, "suggestions": ["Excellent topic knowledge", "Strong delivery", "Consider more personal stories"]}', 
 '2024-06-28 11:30:00'),

-- User 3 practice sessions
('550e8400-e29b-41d4-a716-446655440003', 'debate', 'Social Media', NULL, 'https://example.com/audio/speech6.mp3', 200, 
 '{"overallScore": 8.9, "categories": {"clarity": 9.1, "confidence": 8.7, "structure": 9.0, "delivery": 8.8}, "suggestions": ["Outstanding debate skills", "Excellent rebuttals", "Strong evidence usage"]}', 
 '2024-06-29 13:15:00');

-- Insert sample debate sessions
INSERT INTO debate (user_id, room_id, topic, is_ai, participants, max_participants, difficulty, time_limit, status, category, user_stats, ai_debate, created_at) VALUES
-- User 1 debates
('550e8400-e29b-41d4-a716-446655440001', 1, 'Should social media platforms be regulated?', false, 4, 6, 'Intermediate', 15, 'completed', 'Technology', 
 '{"wins": 1, "losses": 0, "total_debates": 1, "average_score": 8.5, "best_argument": "Regulation protects user privacy"}', 
 '{"ai_arguments": ["Regulation stifles innovation", "Free speech concerns", "Market self-regulation"], "ai_score": 7.8}', 
 '2024-06-25 15:30:00'),
('550e8400-e29b-41d4-a716-446655440001', 2, 'Is remote work the future of employment?', true, 2, 2, 'Advanced', 20, 'completed', 'Business', 
 '{"wins": 1, "losses": 0, "total_debates": 1, "average_score": 9.1, "best_argument": "Increased productivity and work-life balance"}', 
 '{"ai_arguments": ["Loss of team collaboration", "Security concerns", "Management challenges"], "ai_score": 8.2}', 
 '2024-06-26 10:45:00'),

-- User 2 debates
('550e8400-e29b-41d4-a716-446655440002', 3, 'Should college education be free?', false, 5, 6, 'Beginner', 12, 'completed', 'Education', 
 '{"wins": 0, "losses": 1, "total_debates": 1, "average_score": 6.8, "best_argument": "Education is a human right"}', 
 '{"ai_arguments": ["Cost burden on taxpayers", "Quality concerns", "Alternative solutions"], "ai_score": 7.5}', 
 '2024-06-27 14:20:00'),

-- User 3 debates
('550e8400-e29b-41d4-a716-446655440003', 4, 'Is artificial intelligence a threat to humanity?', true, 2, 2, 'Advanced', 25, 'completed', 'Technology', 
 '{"wins": 1, "losses": 0, "total_debates": 1, "average_score": 8.9, "best_argument": "AI enhances human capabilities"}', 
 '{"ai_arguments": ["Job displacement", "Ethical concerns", "Uncontrolled development"], "ai_score": 8.7}', 
 '2024-06-28 16:10:00');

-- Insert sample dashboard data
INSERT INTO dashboard (user_id, total_speeches, debate_wins, average_score, practice_hours, weekly_goal, weekly_progress, recent_activities, quick_actions, created_at) VALUES
-- User 1 dashboard
('550e8400-e29b-41d4-a716-446655440001', 15, 8, 8.7, 12.5, 5, 4, 
 '[
   {"id": 1, "type": "speech", "title": "Technology Impact", "date": "2024-06-27", "duration": "3 min", "score": 8.5},
   {"id": 2, "type": "debate", "title": "Social Media Regulation", "date": "2024-06-25", "duration": "15 min", "result": "Won"},
   {"id": 3, "type": "speech", "title": "Climate Change", "date": "2024-06-26", "duration": "5 min", "score": 9.1}
 ]', 
 '[
   {"title": "Start Practice", "description": "Begin a new speech session", "icon": "Mic", "color": "bg-blue-500/20"},
   {"title": "Join Debate", "description": "Find an active debate room", "icon": "Users", "color": "bg-green-500/20"},
   {"title": "View Analytics", "description": "Check your progress", "icon": "BarChart3", "color": "bg-purple-500/20"}
 ]', 
 '2024-06-20 08:00:00'),

-- User 2 dashboard
('550e8400-e29b-41d4-a716-446655440002', 8, 3, 7.8, 6.2, 3, 2, 
 '[
   {"id": 1, "type": "speech", "title": "Healthcare Reform", "date": "2024-06-28", "duration": "6 min", "score": 8.8},
   {"id": 2, "type": "debate", "title": "College Education", "date": "2024-06-27", "duration": "12 min", "result": "Lost"}
 ]', 
 '[
   {"title": "Start Practice", "description": "Begin a new speech session", "icon": "Mic", "color": "bg-blue-500/20"},
   {"title": "Join Debate", "description": "Find an active debate room", "icon": "Users", "color": "bg-green-500/20"}
 ]', 
 '2024-06-22 10:30:00'),

-- User 3 dashboard
('550e8400-e29b-41d4-a716-446655440003', 22, 12, 8.9, 18.7, 7, 6, 
 '[
   {"id": 1, "type": "debate", "title": "AI and Humanity", "date": "2024-06-28", "duration": "25 min", "result": "Won"},
   {"id": 2, "type": "speech", "title": "Social Media Impact", "date": "2024-06-29", "duration": "3 min", "score": 8.9}
 ]', 
 '[
   {"title": "Start Practice", "description": "Begin a new speech session", "icon": "Mic", "color": "bg-blue-500/20"},
   {"title": "Join Debate", "description": "Find an active debate room", "icon": "Users", "color": "bg-green-500/20"},
   {"title": "View Analytics", "description": "Check your progress", "icon": "BarChart3", "color": "bg-purple-500/20"}
 ]', 
 '2024-06-18 14:15:00');

-- Insert sample analytics data
INSERT INTO analytics (user_id, performance_data, weekly_progress, top_topics, achievements, performance_times, improvement_areas, key_metrics, created_at) VALUES
-- User 1 analytics
('550e8400-e29b-41d4-a716-446655440001', 
 '{"overall": 8.7, "clarity": 8.9, "confidence": 8.2, "structure": 8.8, "delivery": 8.4}', 
 '[
   {"day": "Mon", "speeches": 2, "debates": 1, "score": 8.5},
   {"day": "Tue", "speeches": 1, "debates": 0, "score": 9.1},
   {"day": "Wed", "speeches": 1, "debates": 1, "score": 7.8},
   {"day": "Thu", "speeches": 0, "debates": 0, "score": 0},
   {"day": "Fri", "speeches": 1, "debates": 0, "score": 8.2},
   {"day": "Sat", "speeches": 0, "debates": 0, "score": 0},
   {"day": "Sun", "speeches": 0, "debates": 0, "score": 0}
 ]', 
 '[
   {"topic": "Technology", "count": 5, "average_score": 8.6},
   {"topic": "Climate Change", "count": 3, "average_score": 9.1},
   {"topic": "Education", "count": 2, "average_score": 7.8}
 ]', 
 '[
   {"name": "First Speech", "description": "Completed your first speech", "earned": "2024-06-20"},
   {"name": "Week Warrior", "description": "7 days of consecutive practice", "earned": "2024-06-26"},
   {"name": "High Scorer", "description": "Achieved 9.0+ score", "earned": "2024-06-26"}
 ]', 
 '[
   {"time": "10:00", "sessions": 3},
   {"time": "14:00", "sessions": 2},
   {"time": "16:00", "sessions": 1}
 ]', 
 '[
   {"area": "Confidence", "current": 8.2, "target": 9.0},
   {"area": "Filler Words", "current": 7.5, "target": 8.5},
   {"area": "Audience Engagement", "current": 8.0, "target": 8.8}
 ]', 
 '{"total_sessions": 15, "average_score": 8.7, "practice_hours": 12.5, "win_rate": 73}', 
 '2024-06-20 08:00:00'),

-- User 2 analytics
('550e8400-e29b-41d4-a716-446655440002', 
 '{"overall": 7.8, "clarity": 8.0, "confidence": 7.2, "structure": 7.8, "delivery": 7.9}', 
 '[
   {"day": "Mon", "speeches": 0, "debates": 0, "score": 0},
   {"day": "Tue", "speeches": 1, "debates": 0, "score": 7.2},
   {"day": "Wed", "speeches": 0, "debates": 0, "score": 0},
   {"day": "Thu", "speeches": 0, "debates": 0, "score": 0},
   {"day": "Fri", "speeches": 1, "debates": 1, "score": 8.8},
   {"day": "Sat", "speeches": 0, "debates": 0, "score": 0},
   {"day": "Sun", "speeches": 0, "debates": 0, "score": 0}
 ]', 
 '[
   {"topic": "Healthcare", "count": 3, "average_score": 8.8},
   {"topic": "Politics", "count": 2, "average_score": 7.2},
   {"topic": "Education", "count": 1, "average_score": 6.8}
 ]', 
 '[
   {"name": "First Speech", "description": "Completed your first speech", "earned": "2024-06-22"},
   {"name": "Consistent Practice", "description": "5 days of practice", "earned": "2024-06-28"}
 ]', 
 '[
   {"time": "09:00", "sessions": 1},
   {"time": "11:00", "sessions": 1},
   {"time": "14:00", "sessions": 1}
 ]', 
 '[
   {"area": "Confidence", "current": 7.2, "target": 8.5},
   {"area": "Speech Structure", "current": 7.8, "target": 8.5},
   {"area": "Argument Strength", "current": 7.0, "target": 8.0}
 ]', 
 '{"total_sessions": 8, "average_score": 7.8, "practice_hours": 6.2, "win_rate": 38}', 
 '2024-06-22 10:30:00'),

-- User 3 analytics
('550e8400-e29b-41d4-a716-446655440003', 
 '{"overall": 8.9, "clarity": 9.1, "confidence": 8.7, "structure": 9.0, "delivery": 8.8}', 
 '[
   {"day": "Mon", "speeches": 2, "debates": 1, "score": 8.8},
   {"day": "Tue", "speeches": 1, "debates": 0, "score": 9.2},
   {"day": "Wed", "speeches": 1, "debates": 1, "score": 8.9},
   {"day": "Thu", "speeches": 1, "debates": 0, "score": 8.5},
   {"day": "Fri", "speeches": 1, "debates": 1, "score": 9.1},
   {"day": "Sat", "speeches": 0, "debates": 0, "score": 0},
   {"day": "Sun", "speeches": 0, "debates": 0, "score": 0}
 ]', 
 '[
   {"topic": "Technology", "count": 8, "average_score": 8.9},
   {"topic": "Social Media", "count": 5, "average_score": 8.9},
   {"topic": "AI", "count": 3, "average_score": 9.1}
 ]', 
 '[
   {"name": "First Speech", "description": "Completed your first speech", "earned": "2024-06-18"},
   {"name": "Week Warrior", "description": "7 days of consecutive practice", "earned": "2024-06-24"},
   {"name": "High Scorer", "description": "Achieved 9.0+ score", "earned": "2024-06-20"},
   {"name": "Debate Champion", "description": "Won 10 debates", "earned": "2024-06-28"}
 ]', 
 '[
   {"time": "13:00", "sessions": 4},
   {"time": "16:00", "sessions": 3},
   {"time": "19:00", "sessions": 2}
 ]', 
 '[
   {"area": "Advanced Topics", "current": 8.5, "target": 9.5},
   {"area": "Cross-Examination", "current": 8.8, "target": 9.2},
   {"area": "Time Management", "current": 8.9, "target": 9.3}
 ]', 
 '{"total_sessions": 22, "average_score": 8.9, "practice_hours": 18.7, "win_rate": 55}', 
 '2024-06-18 14:15:00');

-- Insert sample profile data
INSERT INTO profile (user_id, name, email, avatar, join_date, level, points, rank, bio, preferences, achievements, stats, notifications, created_at) VALUES
-- User 1 profile
('550e8400-e29b-41d4-a716-446655440001', 'Alex Johnson', 'alex.johnson@email.com', '/api/placeholder/100/100', 'March 2024', 'Advanced', 2847, 'Gold', 
 'Passionate about public speaking and debate. Always looking to improve my communication skills and help others do the same. Specializing in technology and environmental topics.',
 '{"practiceTime": "30 minutes", "difficulty": "Intermediate", "topics": ["Technology", "Politics", "Environment", "Education"], "language": "English", "timezone": "UTC-5"}',
 '[
   {"name": "First Speech", "description": "Completed your first speech", "earned": "March 15, 2024", "icon": "Star"},
   {"name": "Week Warrior", "description": "7 days of consecutive practice", "earned": "March 22, 2024", "icon": "Target"},
   {"name": "High Scorer", "description": "Achieved 9.0+ score", "earned": "March 28, 2024", "icon": "Award"}
 ]',
 '{"totalSessions": 156, "totalHours": 89, "averageScore": 8.7, "winRate": 68, "streak": 12, "rank": "Top 15%"}',
 '{"email": true, "push": false, "weekly": true, "achievements": true, "reminders": false}',
 '2024-03-15 10:00:00'),

-- User 2 profile
('550e8400-e29b-41d4-a716-446655440002', 'Sarah Chen', 'sarah.chen@email.com', '/api/placeholder/100/100', 'April 2024', 'Intermediate', 1245, 'Silver', 
 'New to public speaking but eager to learn. Focused on healthcare and social issues. Building confidence through regular practice.',
 '{"practiceTime": "20 minutes", "difficulty": "Beginner", "topics": ["Healthcare", "Social Issues", "Education"], "language": "English", "timezone": "UTC-8"}',
 '[
   {"name": "First Speech", "description": "Completed your first speech", "earned": "April 10, 2024", "icon": "Star"},
   {"name": "Consistent Practice", "description": "5 days of practice", "earned": "April 25, 2024", "icon": "Clock"}
 ]',
 '{"totalSessions": 45, "totalHours": 23, "averageScore": 7.8, "winRate": 38, "streak": 5, "rank": "Top 60%"}',
 '{"email": true, "push": true, "weekly": true, "achievements": true, "reminders": true}',
 '2024-04-10 14:30:00'),

-- User 3 profile
('550e8400-e29b-41d4-a716-446655440003', 'Michael Rodriguez', 'michael.rodriguez@email.com', '/api/placeholder/100/100', 'February 2024', 'Expert', 4567, 'Platinum', 
 'Experienced debater and public speaker. Competed in national tournaments and now helping others develop their skills. Expert in technology and AI topics.',
 '{"practiceTime": "45 minutes", "difficulty": "Advanced", "topics": ["Technology", "AI", "Social Media", "Innovation"], "language": "English", "timezone": "UTC-6"}',
 '[
   {"name": "First Speech", "description": "Completed your first speech", "earned": "February 5, 2024", "icon": "Star"},
   {"name": "Week Warrior", "description": "7 days of consecutive practice", "earned": "February 12, 2024", "icon": "Target"},
   {"name": "High Scorer", "description": "Achieved 9.0+ score", "earned": "February 18, 2024", "icon": "Award"},
   {"name": "Debate Champion", "description": "Won 10 debates", "earned": "March 5, 2024", "icon": "Award"},
   {"name": "Consistent Performer", "description": "30 days of practice", "earned": "March 12, 2024", "icon": "Clock"}
 ]',
 '{"totalSessions": 234, "totalHours": 156, "averageScore": 8.9, "winRate": 55, "streak": 28, "rank": "Top 5%"}',
 '{"email": true, "push": false, "weekly": true, "achievements": true, "reminders": false}',
 '2024-02-05 09:15:00'); 
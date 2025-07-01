-- Practice Table
CREATE TABLE practice (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  mode text,
  topic text,
  custom_topic text,
  audio_url text,
  practice_time integer,
  feedback jsonb,
  created_at timestamptz DEFAULT now()
);

-- Debate Table
CREATE TABLE debate (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  room_id integer,
  topic text,
  is_ai boolean DEFAULT false,
  participants integer,
  max_participants integer,
  difficulty text,
  time_limit integer,
  status text,
  category text,
  user_stats jsonb,
  ai_debate jsonb,
  created_at timestamptz DEFAULT now()
);

-- Dashboard Table
CREATE TABLE dashboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  total_speeches integer,
  debate_wins integer,
  average_score numeric,
  practice_hours integer,
  weekly_goal integer,
  weekly_progress integer,
  recent_activities jsonb,
  quick_actions jsonb,
  created_at timestamptz DEFAULT now()
);

-- Analytics Table
CREATE TABLE analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  performance_data jsonb,
  weekly_progress jsonb,
  top_topics jsonb,
  achievements jsonb,
  performance_times jsonb,
  improvement_areas jsonb,
  key_metrics jsonb,
  created_at timestamptz DEFAULT now()
);

-- Profile Table
CREATE TABLE profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text,
  email text,
  avatar text,
  join_date text,
  level text,
  points integer,
  rank text,
  bio text,
  preferences jsonb,
  achievements jsonb,
  stats jsonb,
  notifications jsonb,
  created_at timestamptz DEFAULT now()
);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profile (user_id, name, email, join_date, level, points, rank, bio, preferences, achievements, stats, notifications)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    to_char(new.created_at, 'Month YYYY'),
    'Beginner',
    0,
    'Bronze',
    'Welcome to ForensIQ! Start your journey to becoming a confident speaker.',
    '{"practiceTime": "20 minutes", "difficulty": "Beginner", "topics": ["Technology", "Politics", "Environment"], "language": "English", "timezone": "UTC"}',
    '[]',
    '{"totalSessions": 0, "totalHours": 0, "averageScore": 0, "winRate": 0, "streak": 0, "rank": "New"}',
    '{"email": true, "push": false, "weekly": true, "achievements": true, "reminders": false}'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); 
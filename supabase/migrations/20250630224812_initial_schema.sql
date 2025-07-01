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
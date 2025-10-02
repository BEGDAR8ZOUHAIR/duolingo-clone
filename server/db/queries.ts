import { supabase } from '@/lib/supabase';

export const getUserProgress = async () => {
  const userId = 'demo-user';

  if (!userId) {
    return null;
  }

  const { data } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (!data) return null;

  const course = data.active_course_id ? await getCourseById(data.active_course_id) : null;

  return {
    ...data,
    active_course_id: course,
  };
};

export const getUnits = async () => {
  const userId = 'demo-user';
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.active_course_id) {
    return [];
  }

  const courseId = typeof userProgress.active_course_id === 'object' && userProgress.active_course_id !== null
    ? (userProgress.active_course_id as { id: number }).id
    : userProgress.active_course_id;

  const { data: units } = await supabase
    .from('units')
    .select('*, lessons(*)')
    .eq('course_id', courseId)
    .order('order', { ascending: true });

  if (!units) return [];

  for (const unit of units) {
    if (unit.lessons) {
      unit.lessons.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
    }
  }

  const { data: lessonProgress } = await supabase
    .from('challenge_progress')
    .select('challenge_id, completed, challenges(lesson_id)')
    .eq('user_id', userId);

  const progressMap = new Map();
  lessonProgress?.forEach((progress) => {
    const lessonId = progress.challenges?.[0]?.lesson_id;
    if (lessonId) {
      if (!progressMap.has(lessonId)) {
        progressMap.set(lessonId, { completed: 0, total: 0 });
      }
      progressMap.get(lessonId).total++;
      if (progress.completed) {
        progressMap.get(lessonId).completed++;
      }
    }
  });

  return units.map((unit) => ({
    ...unit,
    lessons: unit.lessons?.map((lesson: { id: number }) => ({
      ...lesson,
      completed: progressMap.get(lesson.id)?.completed === progressMap.get(lesson.id)?.total && progressMap.get(lesson.id)?.total > 0,
    })) || [],
  }));
};

export const getCourses = async () => {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .order('id', { ascending: true });

  return data || [];
};

export const getCourseById = async (courseId: number) => {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .maybeSingle();

  return data;
};

export const getUserSubscription = async () => {
  return null;
};

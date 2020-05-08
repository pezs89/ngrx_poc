import { Course } from '../model/course';

export function compareCourses(c1: Course, c2: Course): number {
  const compare = c1.seqNo - c2.seqNo;
  return compare > 0 ? 1 : compare < 1 ? -1 : 0;
}

import { getHero, getAbout, getProjects, getSkills, getExperience, getContact, getTerminalConfig, getEducation } from '@/lib/db';
import HomeClient from './HomeClient';

export default function HomePage() {
  const hero = getHero();
  const about = getAbout();
  const projects = getProjects();
  const skills = getSkills();
  const experience = getExperience();
  const education = getEducation();
  const contact = getContact();
  const terminal = getTerminalConfig();

  return (
    <HomeClient
      hero={hero}
      about={about}
      projects={projects}
      skills={skills}
      experience={experience}
      education={education}
      contact={contact}
      terminal={terminal}
    />
  );
}

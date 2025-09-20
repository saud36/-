import React, { forwardRef } from 'react';
import { CVData, ThemeSettings } from '../types';
import { MailIcon, PhoneIcon, LinkIcon, LinkedinIcon, GithubIcon } from './Icons';

interface PreviewProps {
  cvData: CVData;
  theme: ThemeSettings;
  t: any;
}

// Reusable template components defined inside Preview.tsx
const ModernTemplate: React.FC<PreviewProps> = ({ cvData, theme, t }) => {
  const { personal, summary, experience, education, skills, languages, socialLinks } = cvData;
  const { color, font } = theme;

  return (
    <div className="bg-white shadow-lg p-8 md:p-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center gap-8 mb-8">
        {personal.photo && <img src={personal.photo} alt={personal.name} className="w-32 h-32 rounded-full object-cover" />}
        <div className="text-center md:text-start">
          <h1 className="text-4xl font-bold" style={{ color: color.primary }}>{personal.name}</h1>
          <p className="text-xl font-medium mt-1" style={{ color: color.secondary }}>{personal.jobTitle}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-sm flex-wrap" style={{color: color.text}}>
            {personal.email && <span className="flex items-center gap-1.5"><MailIcon size={14}/>{personal.email}</span>}
            {personal.phone && <span className="flex items-center gap-1.5"><PhoneIcon size={14}/>{personal.phone}</span>}
            {personal.website && <a href={personal.website} className="flex items-center gap-1.5 hover:underline"><LinkIcon size={14}/>{personal.website}</a>}
            {socialLinks.map(link => (
                <a key={link.id} href={link.url} className="flex items-center gap-1.5 hover:underline">
                    {link.network.toLowerCase() === 'linkedin' && <LinkedinIcon size={14} />}
                    {link.network.toLowerCase() === 'github' && <GithubIcon size={14} />}
                    {link.network}
                </a>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4" style={{ borderColor: color.primary, color: color.primary }}>{t.preview.summary}</h2>
            <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: color.text }}>{summary}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4" style={{ borderColor: color.primary, color: color.primary }}>{t.preview.experience}</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold" style={{ color: color.secondary }}>{exp.position}</h3>
                    <p className="text-sm font-medium" style={{ color: color.text }}>{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-md font-medium" style={{ color: color.text }}>{exp.company}</p>
                  <ul className="mt-2 list-disc list-inside text-base space-y-1" style={{ color: color.text }}>
                    {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ','')}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section>
            <h2 className="text-xl font-bold border-b-2 pb-2 mb-4" style={{ borderColor: color.primary, color: color.primary }}>{t.preview.skills}</h2>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.id}>
                  <p className="text-base font-medium mb-1" style={{ color: color.text }}>{skill.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="h-2.5 rounded-full" style={{ width: `${skill.level}%`, backgroundColor: color.primary }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold border-b-2 pb-2 mb-4" style={{ borderColor: color.primary, color: color.primary }}>{t.preview.education}</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="text-lg font-semibold" style={{ color: color.secondary }}>{edu.degree}</h3>
                  <p className="text-md font-medium" style={{ color: color.text }}>{edu.institution}</p>
                  <p className="text-sm" style={{ color: color.text }}>{edu.graduationDate}{edu.gpa && `, GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-bold border-b-2 pb-2 mb-4" style={{ borderColor: color.primary, color: color.primary }}>{t.preview.languages}</h2>
             <div className="space-y-2">
              {languages.map(lang => (
                <div key={lang.id} className="flex justify-between">
                    <p className="text-base font-medium" style={{ color: color.text }}>{lang.name}</p>
                    <p className="text-sm" style={{ color: color.text }}>{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
};

const ClassicTemplate: React.FC<PreviewProps> = ({ cvData, theme, t }) => {
    const { personal, summary, experience, education, skills, languages, socialLinks } = cvData;
    const { color } = theme;

    return (
        <div className="bg-white shadow-lg p-8 md:p-10 font-serif" style={{ color: color.text }}>
            <div className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: color.primary }}>
                <h1 className="text-4xl font-bold" style={{ color: color.primary }}>{personal.name}</h1>
                <p className="text-lg font-medium mt-1">{personal.jobTitle}</p>
                 <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-sm">
                    {personal.email && <span className="flex items-center gap-1.5">{personal.email}</span>}
                    {personal.phone && <span className="flex items-center gap-1.5">| {personal.phone}</span>}
                    {personal.website && <a href={personal.website} className="flex items-center gap-1.5 hover:underline">| {personal.website}</a>}
                    {socialLinks.map(link => (
                        <a key={link.id} href={link.url} className="flex items-center gap-1.5 hover:underline">| {link.network}</a>
                    ))}
                </div>
            </div>

            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: color.primary }}>{t.preview.summary}</h2>
                <p className="text-base leading-relaxed whitespace-pre-wrap">{summary}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: color.primary }}>{t.preview.experience}</h2>
                <div className="space-y-4">
                    {experience.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-semibold">{exp.company} — <span className="font-normal italic">{exp.position}</span></h3>
                                <p className="text-sm font-medium">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <ul className="mt-1 list-disc list-inside text-base space-y-1 text-gray-700">
                                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ','')}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

             <section className="mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: color.primary }}>{t.preview.education}</h2>
                <div className="space-y-2">
                    {education.map(edu => (
                        <div key={edu.id} className="flex justify-between items-baseline">
                             <div>
                                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                                <p className="text-md italic">{edu.degree}{edu.gpa && `, GPA: ${edu.gpa}`}</p>
                             </div>
                            <p className="text-sm font-medium">{edu.graduationDate}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: color.primary }}>{t.preview.skillsAndLanguages}</h2>
                <div className="flex justify-between flex-wrap gap-4">
                    <p><strong>{t.preview.skills}:</strong> {skills.map(s => s.name).join(', ')}</p>
                    <p><strong>{t.preview.languages}:</strong> {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}</p>
                </div>
            </section>
        </div>
    );
};


export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ cvData, theme, t }, ref) => {
  const TemplateComponent = theme.template === 'classic' ? ClassicTemplate : ModernTemplate;
  return (
    <div ref={ref}>
        <TemplateComponent cvData={cvData} theme={theme} t={t} />
    </div>
  );
});
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CVData, ThemeSettings, PersonalInfo, Experience, Education, Skill, Language, Project, SocialLink, CustomSection } from '../types';
import { THEMES, FONTS, LANGUAGE_PROFICIENCY, LANGUAGE_PROFICIENCY_AR } from '../constants';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon, ResetIcon } from './Icons';
import { useTranslation } from '../hooks/useTranslation';

interface SidebarProps {
  cvData: CVData;
  onUpdate: <K extends keyof CVData, V extends CVData[K]>(section: K, value: V) => void;
  onReset: () => void;
  theme: ThemeSettings;
  onThemeChange: (theme: ThemeSettings) => void;
  t: any;
}

// Reusable Collapsible Section Component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-custom-gray-200 dark:border-custom-gray-700">
      <button
        className="w-full flex justify-between items-center p-4 text-start font-semibold text-custom-gray-700 dark:text-custom-gray-200 hover:bg-custom-gray-50 dark:hover:bg-custom-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      {isOpen && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
};


const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300 mb-1">{label}</label>
    <input
      {...props}
      className="w-full px-3 py-2 bg-white dark:bg-custom-gray-800 border border-custom-gray-300 dark:border-custom-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300 mb-1">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full px-3 py-2 bg-white dark:bg-custom-gray-800 border border-custom-gray-300 dark:border-custom-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
);

// Editor components defined inside Sidebar.tsx
const PersonalInfoEditor: React.FC<{ data: PersonalInfo; onUpdate: (data: PersonalInfo) => void; t: any; }> = ({ data, onUpdate, t }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="space-y-4">
      <Input label={t.editors.fullName} name="name" value={data.name} onChange={handleChange} />
      <Input label={t.editors.jobTitle} name="jobTitle" value={data.jobTitle} onChange={handleChange} />
      <Input label={t.editors.email} name="email" type="email" value={data.email} onChange={handleChange} />
      <Input label={t.editors.phone} name="phone" type="tel" value={data.phone} onChange={handleChange} />
      <Input label={t.editors.website} name="website" value={data.website} onChange={handleChange} />
      <Input label={t.editors.photoUrl} name="photo" value={data.photo} onChange={handleChange} />
    </div>
  );
};

const ExperienceEditor: React.FC<{ data: Experience[]; onUpdate: (data: Experience[]) => void; t: any; }> = ({ data, onUpdate, t }) => {
    const handleChange = (id: string, field: keyof Experience, value: string) => {
        onUpdate(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };
    const addExperience = () => {
        onUpdate([...data, { id: uuidv4(), company: '', position: '', startDate: '', endDate: '', description: '' }]);
    };
    const removeExperience = (id: string) => {
        onUpdate(data.filter(exp => exp.id !== id));
    };
    return (
        <div className="space-y-4">
            {data.map((exp) => (
                <div key={exp.id} className="p-4 border rounded-md dark:border-custom-gray-600 space-y-3 relative">
                     <button onClick={() => removeExperience(exp.id)} className="absolute top-2 end-2 p-1 text-red-500 hover:text-red-700"><TrashIcon /></button>
                    <Input label={t.editors.company} value={exp.company} onChange={e => handleChange(exp.id, 'company', e.target.value)} />
                    <Input label={t.editors.position} value={exp.position} onChange={e => handleChange(exp.id, 'position', e.target.value)} />
                    <div className="flex gap-4">
                        <Input label={t.editors.startDate} value={exp.startDate} onChange={e => handleChange(exp.id, 'startDate', e.target.value)} />
                        <Input label={t.editors.endDate} value={exp.endDate} onChange={e => handleChange(exp.id, 'endDate', e.target.value)} />
                    </div>
                    <Textarea label={t.editors.description} value={exp.description} onChange={e => handleChange(exp.id, 'description', e.target.value)} />
                </div>
            ))}
            <button onClick={addExperience} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <PlusIcon /> {t.editors.addExperience}
            </button>
        </div>
    );
};

const EducationEditor: React.FC<{ data: Education[]; onUpdate: (data: Education[]) => void; t: any; }> = ({ data, onUpdate, t }) => {
  const handleChange = (id: string, field: keyof Education, value: string) => {
    onUpdate(data.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };
  const addEducation = () => {
    onUpdate([...data, { id: uuidv4(), institution: '', degree: '', graduationDate: '' }]);
  };
  const removeEducation = (id: string) => {
    onUpdate(data.filter(edu => edu.id !== id));
  };
  return (
    <div className="space-y-4">
      {data.map((edu) => (
        <div key={edu.id} className="p-4 border rounded-md dark:border-custom-gray-600 space-y-3 relative">
          <button onClick={() => removeEducation(edu.id)} className="absolute top-2 end-2 p-1 text-red-500 hover:text-red-700"><TrashIcon /></button>
          <Input label={t.editors.institution} value={edu.institution} onChange={e => handleChange(edu.id, 'institution', e.target.value)} />
          <Input label={t.editors.degree} value={edu.degree} onChange={e => handleChange(edu.id, 'degree', e.target.value)} />
          <div className="flex gap-4">
            <Input label={t.editors.gradDate} value={edu.graduationDate} onChange={e => handleChange(edu.id, 'graduationDate', e.target.value)} />
            <Input label={t.editors.gpa} value={edu.gpa || ''} onChange={e => handleChange(edu.id, 'gpa', e.target.value)} />
          </div>
        </div>
      ))}
      <button onClick={addEducation} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <PlusIcon /> {t.editors.addEducation}
      </button>
    </div>
  );
};


const SkillsEditor: React.FC<{ skills: Skill[]; languages: Language[]; onUpdateSkills: (data: Skill[]) => void; onUpdateLangs: (data: Language[]) => void; t: any; }> = ({ skills, languages, onUpdateSkills, onUpdateLangs, t }) => {
    const { lang } = useTranslation();
    const proficiencyLevels = lang === 'ar' ? LANGUAGE_PROFICIENCY_AR : LANGUAGE_PROFICIENCY;
    
    const handleSkillChange = (id: string, field: keyof Skill, value: string | number) => {
        onUpdateSkills(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
    };
    const addSkill = () => { onUpdateSkills([...skills, { id: uuidv4(), name: '', level: 50 }]); };
    const removeSkill = (id: string) => { onUpdateSkills(skills.filter(s => s.id !== id)); };

    const handleLangChange = (id: string, field: keyof Language, value: string) => {
        onUpdateLangs(languages.map(l => l.id === id ? { ...l, [field]: value } : l));
    };
    const addLang = () => { onUpdateLangs([...languages, { id: uuidv4(), name: '', proficiency: 'Intermediate' }]); };
    const removeLang = (id: string) => { onUpdateLangs(languages.filter(l => l.id !== id)); };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-2 dark:text-custom-gray-200">{t.editors.techSkills}</h3>
                <div className="space-y-2">
                    {skills.map(skill => (
                        <div key={skill.id} className="flex items-center gap-2">
                            <Input label="" placeholder={t.editors.skillName} value={skill.name} onChange={e => handleSkillChange(skill.id, 'name', e.target.value)} className="flex-grow"/>
                            <input type="range" min="0" max="100" value={skill.level} onChange={e => handleSkillChange(skill.id, 'level', parseInt(e.target.value, 10))} className="w-24"/>
                            <span className="text-sm w-8">{skill.level}%</span>
                            <button onClick={() => removeSkill(skill.id)} className="p-1 text-red-500 hover:text-red-700"><TrashIcon /></button>
                        </div>
                    ))}
                </div>
                 <button onClick={addSkill} className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    <PlusIcon /> {t.editors.addSkill}
                </button>
            </div>
             <div>
                <h3 className="font-semibold mb-2 dark:text-custom-gray-200">{t.editors.languages}</h3>
                <div className="space-y-2">
                     {languages.map(langItem => (
                        <div key={langItem.id} className="flex items-center gap-2">
                            <Input label="" placeholder={t.editors.language} value={langItem.name} onChange={e => handleLangChange(langItem.id, 'name', e.target.value)} className="flex-grow"/>
                            <select value={langItem.proficiency} onChange={e => handleLangChange(langItem.id, 'proficiency', e.target.value)} className="px-3 py-2 bg-white dark:bg-custom-gray-800 border border-custom-gray-300 dark:border-custom-gray-600 rounded-md">
                                {proficiencyLevels.map((p, index) => <option key={p} value={LANGUAGE_PROFICIENCY[index]}>{p}</option>)}
                            </select>
                            <button onClick={() => removeLang(langItem.id)} className="p-1 text-red-500 hover:text-red-700"><TrashIcon /></button>
                        </div>
                    ))}
                </div>
                 <button onClick={addLang} className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    <PlusIcon /> {t.editors.addLang}
                </button>
            </div>
        </div>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ cvData, onUpdate, onReset, theme, onThemeChange, t }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto text-sm text-custom-gray-800 dark:text-custom-gray-200">
        <Section title={t.sidebar.design}>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300 mb-1">{t.sidebar.template}</label>
                    <select value={theme.template} onChange={e => onThemeChange({...theme, template: e.target.value as 'modern' | 'classic'})} className="w-full px-3 py-2 bg-white dark:bg-custom-gray-800 border border-custom-gray-300 dark:border-custom-gray-600 rounded-md">
                        <option value="modern">{t.sidebar.modern}</option>
                        <option value="classic">{t.sidebar.classic}</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300 mb-1">{t.sidebar.colorScheme}</label>
                    <div className="grid grid-cols-3 gap-2">
                        {THEMES.map(th => (
                            <button key={th.name} onClick={() => onThemeChange({...theme, color: th.colors})} className={`p-2 rounded-md border-2 ${theme.color.primary === th.colors.primary ? 'border-blue-500' : 'border-transparent'}`}>
                                <div className="flex items-center gap-1">
                                    <span style={{ backgroundColor: th.colors.primary }} className="w-4 h-4 rounded-full"></span>
                                    <span className="text-xs">{th.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300 mb-1">{t.sidebar.fontFamily}</label>
                    <select value={theme.font} onChange={e => onThemeChange({...theme, font: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-custom-gray-800 border border-custom-gray-300 dark:border-custom-gray-600 rounded-md">
                        {FONTS.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                    </select>
                </div>
            </div>
        </Section>
        <Section title={t.sidebar.personalInfo}>
            <PersonalInfoEditor data={cvData.personal} onUpdate={(data) => onUpdate('personal', data)} t={t} />
        </Section>
        <Section title={t.sidebar.summary}>
            <Textarea label="" value={cvData.summary} onChange={(e) => onUpdate('summary', e.target.value)} />
        </Section>
        <Section title={t.sidebar.experience}>
            <ExperienceEditor data={cvData.experience} onUpdate={(data) => onUpdate('experience', data)} t={t} />
        </Section>
        <Section title={t.sidebar.education}>
            <EducationEditor data={cvData.education} onUpdate={(data) => onUpdate('education', data)} t={t} />
        </Section>
        <Section title={t.sidebar.skills}>
            <SkillsEditor 
              skills={cvData.skills} 
              languages={cvData.languages} 
              onUpdateSkills={(data) => onUpdate('skills', data)} 
              onUpdateLangs={(data) => onUpdate('languages', data)}
              t={t}
            />
        </Section>
      </div>
      <div className="p-4 border-t border-custom-gray-200 dark:border-custom-gray-700">
        <button onClick={onReset} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
          <ResetIcon /> {t.sidebar.reset}
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CVData, ThemeSettings, PersonalInfo, Experience, Education, Skill, Language, Project, SocialLink, CustomSection } from '../types';
import { THEMES, FONTS, LANGUAGE_PROFICIENCY, LANGUAGE_PROFICIENCY_AR, TEMPLATES, SKILL_STYLES, DIVIDER_STYLES } from '../constants';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon, ResetIcon, EyeIcon, EyeOffIcon, ArrowUpIcon, ArrowDownIcon } from './Icons';
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
const Section: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
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

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, options: {value: string, name: string}[] }> = ({ label, options, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300 mb-1">{label}</label>
      <select {...props} className="w-full px-3 py-2 bg-white dark:bg-custom-gray-800 border border-custom-gray-300 dark:border-custom-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition">
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
      </select>
    </div>
);

const Toggle: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void }> = ({ label, enabled, onChange }) => (
    <div className="flex items-center gap-2">
        <button onClick={() => onChange(!enabled)} className="p-1 rounded-full text-custom-gray-500 dark:text-custom-gray-400 hover:bg-custom-gray-100 dark:hover:bg-custom-gray-800">
            {enabled ? <EyeIcon /> : <EyeOffIcon />}
        </button>
        <span className="text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300">{label}</span>
    </div>
);


// Editor components
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
      <Input label={t.editors.photoUrl} name="photo" value={data.photo} onChange={handleChange} />
    </div>
  );
};

const SocialLinksEditor: React.FC<{ data: SocialLink[]; onUpdate: (data: SocialLink[]) => void; t: any; }> = ({ data, onUpdate, t }) => {
    const networks: SocialLink['network'][] = ['LinkedIn', 'GitHub', 'Twitter', 'Website'];
    const handleChange = (id: string, field: keyof SocialLink, value: string) => {
        onUpdate(data.map(link => link.id === id ? { ...link, [field]: value } : link));
    };
    const addLink = () => {
        onUpdate([...data, { id: uuidv4(), network: 'Website', url: '' }]);
    };
    const removeLink = (id: string) => {
        onUpdate(data.filter(link => link.id !== id));
    };
    return (
        <div className="space-y-3">
            {data.map(link => (
                <div key={link.id} className="flex items-end gap-2 p-2 border rounded-md dark:border-custom-gray-700">
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300 mb-1">{t.editors.network}</label>
                        <select
                            value={link.network}
                            onChange={e => handleChange(link.id, 'network', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-custom-gray-800 border border-custom-gray-300 dark:border-custom-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {networks.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="flex-grow-[2]">
                        <Input label="URL" value={link.url} onChange={e => handleChange(link.id, 'url', e.target.value)} />
                    </div>
                    <button onClick={() => removeLink(link.id)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon /></button>
                </div>
            ))}
            <button onClick={addLink} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <PlusIcon /> {t.editors.addLink}
            </button>
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

const SkillsEditor: React.FC<{ data: Skill[]; onUpdate: (data: Skill[]) => void; t: any; }> = ({ data, onUpdate, t }) => {
    const handleSkillChange = (id: string, field: keyof Skill, value: string | number) => {
        onUpdate(data.map(s => s.id === id ? { ...s, [field]: value } : s));
    };
    const addSkill = () => { onUpdate([...data, { id: uuidv4(), name: '', level: 50 }]); };
    const removeSkill = (id: string) => { onUpdate(data.filter(s => s.id !== id)); };

    return (
        <div className="space-y-3">
            {data.map(skill => (
                <div key={skill.id} className="flex items-center gap-2 p-2 border rounded-md dark:border-custom-gray-700">
                    <div className="flex-grow">
                        <Input label="" placeholder={t.editors.skillName} value={skill.name} onChange={e => handleSkillChange(skill.id, 'name', e.target.value)} />
                    </div>
                    <input type="range" min="0" max="100" value={skill.level} onChange={e => handleSkillChange(skill.id, 'level', parseInt(e.target.value, 10))} className="w-24"/>
                    <span className="text-sm w-8 text-end">{skill.level}%</span>
                    <button onClick={() => removeSkill(skill.id)} className="p-1 text-red-500 hover:text-red-700"><TrashIcon /></button>
                </div>
            ))}
             <button onClick={addSkill} className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <PlusIcon /> {t.editors.addSkill}
            </button>
        </div>
    );
};

const LanguagesEditor: React.FC<{ data: Language[]; onUpdate: (data: Language[]) => void; t: any; }> = ({ data, onUpdate, t }) => {
    const { lang } = useTranslation();
    const proficiencyLevels = lang === 'ar' ? LANGUAGE_PROFICIENCY_AR : LANGUAGE_PROFICIENCY;
    
    const handleLangChange = (id: string, field: keyof Language, value: string) => {
        onUpdate(data.map(l => l.id === id ? { ...l, [field]: value } : l));
    };
    const addLang = () => { onUpdate([...data, { id: uuidv4(), name: '', proficiency: 'Intermediate' }]); };
    const removeLang = (id: string) => { onUpdate(data.filter(l => l.id !== id)); };
    
    return (
        <div className="space-y-3">
             {data.map(langItem => (
                <div key={langItem.id} className="flex items-end gap-2 p-2 border rounded-md dark:border-custom-gray-700">
                    <div className="flex-grow">
                        <Input label="" placeholder={t.editors.language} value={langItem.name} onChange={e => handleLangChange(langItem.id, 'name', e.target.value)} />
                    </div>
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-custom-gray-600 dark:text-custom-gray-300 mb-1">{t.editors.proficiency}</label>
                        <select value={langItem.proficiency} onChange={e => handleLangChange(langItem.id, 'proficiency', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-custom-gray-800 border border-custom-gray-300 dark:border-custom-gray-600 rounded-md">
                            {proficiencyLevels.map((p, index) => <option key={p} value={LANGUAGE_PROFICIENCY[index]}>{p}</option>)}
                        </select>
                    </div>
                    <button onClick={() => removeLang(langItem.id)} className="p-1 text-red-500 hover:text-red-700"><TrashIcon /></button>
                </div>
            ))}
             <button onClick={addLang} className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <PlusIcon /> {t.editors.addLang}
            </button>
        </div>
    );
};

const ProjectsEditor: React.FC<{ data: Project[]; onUpdate: (data: Project[]) => void; t: any; }> = ({ data, onUpdate, t }) => {
    const handleChange = (id: string, field: keyof Project, value: string) => {
        onUpdate(data.map(p => p.id === id ? { ...p, [field]: value } : p));
    };
    const addProject = () => { onUpdate([...data, { id: uuidv4(), name: '', url: '', description: '' }]); };
    const removeProject = (id: string) => { onUpdate(data.filter(p => p.id !== id)); };

    return (
        <div className="space-y-4">
            {data.map(project => (
                <div key={project.id} className="p-4 border rounded-md dark:border-custom-gray-600 space-y-3 relative">
                    <button onClick={() => removeProject(project.id)} className="absolute top-2 end-2 p-1 text-red-500 hover:text-red-700"><TrashIcon /></button>
                    <Input label={t.editors.projectName} value={project.name} onChange={e => handleChange(project.id, 'name', e.target.value)} />
                    <Input label={t.editors.projectUrl} value={project.url} onChange={e => handleChange(project.id, 'url', e.target.value)} />
                    <Textarea label={t.editors.description} value={project.description} onChange={e => handleChange(project.id, 'description', e.target.value)} />
                </div>
            ))}
            <button onClick={addProject} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <PlusIcon /> {t.editors.addProject}
            </button>
        </div>
    );
};

const CustomSectionsEditor: React.FC<{ data: CustomSection[]; onUpdate: (data: CustomSection[]) => void; t: any; }> = ({ data, onUpdate, t }) => {
    const handleChange = (id: string, field: keyof CustomSection, value: string) => {
        onUpdate(data.map(s => s.id === id ? { ...s, [field]: value } : s));
    };
    const addSection = () => { onUpdate([...data, { id: uuidv4(), title: 'New Section', content: '' }]); };
    const removeSection = (id: string) => { onUpdate(data.filter(s => s.id !== id)); };

    return (
        <div className="space-y-4">
            {data.map(section => (
                <div key={section.id} className="p-4 border rounded-md dark:border-custom-gray-600 space-y-3 relative">
                    <button onClick={() => removeSection(section.id)} className="absolute top-2 end-2 p-1 text-red-500 hover:text-red-700"><TrashIcon /></button>
                    <Input label={t.editors.sectionTitle} value={section.title} onChange={e => handleChange(section.id, 'title', e.target.value)} />
                    <Textarea label={t.editors.content} value={section.content} onChange={e => handleChange(section.id, 'content', e.target.value)} />
                </div>
            ))}
            <button onClick={addSection} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <PlusIcon /> {t.editors.addCustomSection}
            </button>
        </div>
    );
};


const LayoutEditor: React.FC<{
    cvData: CVData;
    onUpdate: <K extends keyof CVData, V extends CVData[K]>(section: K, value: V) => void;
    t: any;
}> = ({ cvData, onUpdate, t }) => {
    const { sectionOrder, sectionTitles, sectionVisibility } = cvData;
    
    const handleTitleChange = (section: keyof typeof sectionTitles, value: string) => {
        onUpdate('sectionTitles', { ...sectionTitles, [section]: value });
    };

    const handleVisibilityChange = (section: keyof typeof sectionVisibility, value: boolean) => {
        onUpdate('sectionVisibility', { ...sectionVisibility, [section]: value });
    };
    
    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newOrder = [...sectionOrder];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < newOrder.length) {
            [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
            onUpdate('sectionOrder', newOrder);
        }
    };

    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-custom-gray-700 dark:text-custom-gray-200">{t.sidebar.layout}</h3>
            {sectionOrder.map((key, index) => (
                 <div key={key} className="p-3 border rounded-md dark:border-custom-gray-700 space-y-2">
                    <div className="flex justify-between items-center">
                        <Toggle label={t.sidebar[key] || key} enabled={sectionVisibility[key]} onChange={v => handleVisibilityChange(key, v)} />
                         <div className="flex items-center gap-1">
                            <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 rounded disabled:opacity-30 disabled:cursor-not-allowed text-custom-gray-600 dark:text-custom-gray-300 hover:bg-custom-gray-100 dark:hover:bg-custom-gray-800"><ArrowUpIcon /></button>
                            <button onClick={() => moveSection(index, 'down')} disabled={index === sectionOrder.length - 1} className="p-1 rounded disabled:opacity-30 disabled:cursor-not-allowed text-custom-gray-600 dark:text-custom-gray-300 hover:bg-custom-gray-100 dark:hover:bg-custom-gray-800"><ArrowDownIcon /></button>
                        </div>
                    </div>
                    <Input label={t.editors.sectionTitle} value={sectionTitles[key]} onChange={e => handleTitleChange(key, e.target.value)} />
                </div>
            ))}
             <div className="p-3 border rounded-md dark:border-custom-gray-700">
                <Toggle label={t.sidebar.socialLinks} enabled={sectionVisibility.socialLinks} onChange={v => handleVisibilityChange('socialLinks', v)} />
            </div>
             <div className="p-3 border rounded-md dark:border-custom-gray-700">
                <Toggle label={t.sidebar.customSections} enabled={sectionVisibility.customSections} onChange={v => handleVisibilityChange('customSections', v)} />
            </div>
        </div>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ cvData, onUpdate, onReset, theme, onThemeChange, t }) => {
  const translatedTemplates = TEMPLATES.map(item => ({...item, name: t.sidebar[item.value] || item.name}));
  const translatedSkillStyles = SKILL_STYLES.map(item => ({...item, name: t.editors[item.value] || item.name}));
  const translatedDividerStyles = DIVIDER_STYLES.map(item => ({...item, name: t.editors[item.value] || item.name}));

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto text-sm text-custom-gray-800 dark:text-custom-gray-200">
        <Section title={t.sidebar.design} defaultOpen={true}>
            <div className="space-y-4">
                <Select label={t.sidebar.template} options={translatedTemplates} value={theme.template} onChange={e => onThemeChange({...theme, template: e.target.value as ThemeSettings['template']})} />
                <Select label={t.sidebar.skillStyle} options={translatedSkillStyles} value={theme.skillDisplayStyle} onChange={e => onThemeChange({...theme, skillDisplayStyle: e.target.value as ThemeSettings['skillDisplayStyle']})} />
                <Select label={t.sidebar.dividerStyle} options={translatedDividerStyles} value={theme.sectionDividerStyle} onChange={e => onThemeChange({...theme, sectionDividerStyle: e.target.value as ThemeSettings['sectionDividerStyle']})} />
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
                <Select label={t.sidebar.fontFamily} options={FONTS.map(f => ({value: f.value, name: f.name}))} value={theme.font} onChange={e => onThemeChange({...theme, font: e.target.value})} />
            </div>
        </Section>
        <Section title={t.sidebar.layout}>
            <LayoutEditor cvData={cvData} onUpdate={onUpdate} t={t} />
        </Section>
        <Section title={t.sidebar.personalInfo}>
            <PersonalInfoEditor data={cvData.personal} onUpdate={(data) => onUpdate('personal', data)} t={t} />
        </Section>
        <Section title={t.sidebar.socialLinks}>
            <SocialLinksEditor data={cvData.socialLinks} onUpdate={(data) => onUpdate('socialLinks', data)} t={t} />
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
            <SkillsEditor data={cvData.skills} onUpdate={(data) => onUpdate('skills', data)} t={t} />
        </Section>
         <Section title={t.sidebar.languages}>
            <LanguagesEditor data={cvData.languages} onUpdate={(data) => onUpdate('languages', data)} t={t} />
        </Section>
        <Section title={t.sidebar.projects}>
            <ProjectsEditor data={cvData.projects} onUpdate={(data) => onUpdate('projects', data)} t={t} />
        </Section>
        <Section title={t.sidebar.customSections}>
            <CustomSectionsEditor data={cvData.customSections} onUpdate={(data) => onUpdate('customSections', data)} t={t} />
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


import React, { forwardRef, ReactNode } from 'react';
import { CVData, ThemeSettings, Skill } from '../types';
import { MailIcon, PhoneIcon, WebsiteIcon, LinkedinIcon, GithubIcon, TwitterIcon } from './Icons';

interface PreviewProps {
  cvData: CVData;
  theme: ThemeSettings;
  t: any;
}
interface SectionProps {
  cvData: CVData;
  theme: ThemeSettings;
  t?: any;
}

const socialIconMap: Record<string, ReactNode> = {
    linkedin: <LinkedinIcon size={14} />,
    github: <GithubIcon size={14} />,
    twitter: <TwitterIcon size={14} />,
    website: <WebsiteIcon size={14} />,
};

// =================================================================
// SECTION COMPONENTS
// =================================================================

const SummarySection: React.FC<SectionProps> = ({ cvData, theme }) => (
    <section>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: theme.color.primary }}>{cvData.sectionTitles.summary}</h2>
        <p className="text-base leading-relaxed whitespace-pre-wrap">{cvData.summary}</p>
    </section>
);

const ExperienceSection: React.FC<SectionProps> = ({ cvData, theme }) => (
    <section>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: theme.color.primary }}>{cvData.sectionTitles.experience}</h2>
        <div className="space-y-4">
            {cvData.experience.map(exp => (
                <div key={exp.id}>
                    <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className="text-lg font-semibold" style={{ color: theme.color.secondary }}>{exp.position}</h3>
                        <p className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-md font-medium">{exp.company}</p>
                    <ul className="mt-1 list-disc list-inside text-sm space-y-1 text-gray-700">
                        {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('• ','')}</li>)}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

const EducationSection: React.FC<SectionProps> = ({ cvData, theme }) => (
    <section>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: theme.color.primary }}>{cvData.sectionTitles.education}</h2>
        <div className="space-y-2">
            {cvData.education.map(edu => (
                <div key={edu.id}>
                    <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className="text-lg font-semibold">{edu.institution}</h3>
                        <p className="text-sm font-medium text-gray-600">{edu.graduationDate}</p>
                    </div>
                    <p className="text-md italic">{edu.degree}{edu.gpa && `, GPA: ${edu.gpa}`}</p>
                </div>
            ))}
        </div>
    </section>
);

const ProjectsSection: React.FC<SectionProps> = ({ cvData, theme }) => (
    <section>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: theme.color.primary }}>{cvData.sectionTitles.projects}</h2>
        <div className="space-y-4">
            {cvData.projects.map(proj => (
                <div key={proj.id}>
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline" style={{ color: theme.color.secondary }}>{proj.name}</a>
                    <p className="mt-1 text-sm whitespace-pre-wrap">{proj.description}</p>
                </div>
            ))}
        </div>
    </section>
);

const LanguagesSection: React.FC<SectionProps> = ({ cvData, theme }) => (
    <section>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: theme.color.primary }}>{cvData.sectionTitles.languages}</h2>
        <div className="space-y-1">
            {cvData.languages.map(lang => (
                <div key={lang.id} className="flex justify-between text-sm">
                    <p className="font-medium">{lang.name}</p>
                    <p className="text-gray-600">{lang.proficiency}</p>
                </div>
            ))}
        </div>
    </section>
);

const CustomSections: React.FC<SectionProps> = ({ cvData, theme }) => (
    <>
    {cvData.customSections.map(section => (
        <section key={section.id}>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: theme.color.primary }}>{section.title}</h2>
            <div className="text-base leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: section.content.replace(/\n/g, '<br />')}}></div>
        </section>
    ))}
    </>
);

const SkillRenderer: React.FC<{skill: Skill, theme: ThemeSettings}> = ({ skill, theme }) => {
    switch (theme.skillDisplayStyle) {
        case 'dots':
            return (
                <div className="text-sm">
                    <p className="font-medium mb-1">{skill.name}</p>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <span key={i} className={`h-2.5 w-2.5 rounded-full ${i < skill.level / 10 ? '' : 'opacity-25'}`} style={{ backgroundColor: theme.color.primary }}></span>
                        ))}
                    </div>
                </div>
            );
        case 'tags':
            return (
                <span className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full" style={{ backgroundColor: theme.color.primary, color: theme.color.headerText }}>
                    {skill.name}
                </span>
            );
        case 'bar':
        default:
             return (
                <div className="text-sm">
                  <p className="font-medium mb-1">{skill.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${skill.level}%`, backgroundColor: theme.color.primary }}></div>
                  </div>
                </div>
              );
    }
};

const SkillsSection: React.FC<SectionProps> = ({ cvData, theme }) => (
    <section>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: theme.color.primary }}>{cvData.sectionTitles.skills}</h2>
        <div className={`flex flex-wrap gap-2 ${theme.skillDisplayStyle === 'tags' ? '' : 'space-y-2 flex-col items-stretch'}`}>
            {cvData.skills.map(skill => <SkillRenderer key={skill.id} skill={skill} theme={theme} />)}
        </div>
    </section>
);


const SectionDivider: React.FC<{theme: ThemeSettings}> = ({ theme }) => {
    if (theme.sectionDividerStyle === 'none') return null;
    const style = theme.sectionDividerStyle === 'dashed' ? 'dashed' : 'solid';
    return <hr className="my-6" style={{ borderTopStyle: style, borderColor: theme.color.primary, opacity: 0.5 }} />
};

const sectionComponentMap: Record<string, React.ComponentType<SectionProps>> = {
    summary: SummarySection,
    experience: ExperienceSection,
    education: EducationSection,
    skills: SkillsSection,
    languages: LanguagesSection,
    projects: ProjectsSection,
};

const renderSections = (cvData: CVData, theme: ThemeSettings) => {
    const sectionsToRender = cvData.sectionOrder.map((key, index) => {
        if (!cvData.sectionVisibility[key as keyof typeof cvData.sectionVisibility]) return null;
        const Component = sectionComponentMap[key];
        if (!Component) return null;

        return (
            <React.Fragment key={key}>
                <Component cvData={cvData} theme={theme} />
                {index < cvData.sectionOrder.length -1 && <SectionDivider theme={theme} />}
            </React.Fragment>
        );
    });
    
    const customSections = cvData.sectionVisibility.customSections && cvData.customSections.length > 0
        ? (
            <>
                <SectionDivider theme={theme} />
                <CustomSections cvData={cvData} theme={theme} />
            </>
        )
        : null;

    return [...sectionsToRender, customSections];
};


// =================================================================
// TEMPLATE COMPONENTS
// =================================================================

const ModernTemplate: React.FC<PreviewProps> = ({ cvData, theme }) => {
    const { personal, socialLinks } = cvData;
    return (
        <div className="bg-white shadow-lg p-8 md:p-12">
            <header className="flex flex-col md:flex-row items-center gap-8 mb-8 text-center md:text-start">
                {personal.photo && <img src={personal.photo} alt={personal.name} className="w-32 h-32 rounded-full object-cover" />}
                <div>
                    <h1 className="text-4xl font-bold" style={{ color: theme.color.primary }}>{personal.name}</h1>
                    <p className="text-xl font-medium mt-1" style={{ color: theme.color.secondary }}>{personal.jobTitle}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-sm flex-wrap">
                        {personal.email && <span className="flex items-center gap-1.5"><MailIcon size={14}/>{personal.email}</span>}
                        {personal.phone && <span className="flex items-center gap-1.5"><PhoneIcon size={14}/>{personal.phone}</span>}
                        {cvData.sectionVisibility.socialLinks && socialLinks.map(link => (
                            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                                {socialIconMap[link.network.toLowerCase()] || <WebsiteIcon size={14} />}
                                <span>{link.network === 'Website' ? personal.website : link.network}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </header>
            <main className="space-y-6">
                {renderSections(cvData, theme)}
            </main>
        </div>
    );
};

const ClassicTemplate: React.FC<PreviewProps> = ({ cvData, theme }) => {
     const { personal, socialLinks } = cvData;
    return (
        <div className="bg-white shadow-lg p-8 md:p-10 font-serif">
            <header className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: theme.color.primary }}>
                <h1 className="text-4xl font-bold" style={{ color: theme.color.primary }}>{personal.name}</h1>
                <p className="text-lg font-medium mt-1">{personal.jobTitle}</p>
                 <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-sm">
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>| {personal.phone}</span>}
                    {cvData.sectionVisibility.socialLinks && socialLinks.map(link => (
                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">| {link.network}</a>
                    ))}
                </div>
            </header>
            <main className="space-y-6">
                {renderSections(cvData, theme)}
            </main>
        </div>
    );
};

const CreativeTemplate: React.FC<PreviewProps> = ({ cvData, theme }) => {
    const { personal, socialLinks } = cvData;
    const mainSections: Array<keyof typeof sectionComponentMap> = ['summary', 'experience', 'projects'];
    const asideSections: Array<keyof typeof sectionComponentMap> = ['education', 'skills', 'languages'];
    return (
        <div className="bg-white shadow-lg flex min-h-[11in]">
            <aside className="w-1/3 p-6" style={{backgroundColor: theme.color.primary, color: theme.color.headerText}}>
                <div className="flex flex-col items-center text-center">
                    {personal.photo && <img src={personal.photo} alt={personal.name} className="w-32 h-32 rounded-full object-cover border-4 border-white mb-4" />}
                    <h1 className="text-3xl font-bold">{personal.name}</h1>
                    <p className="text-lg font-medium mt-1 opacity-90">{personal.jobTitle}</p>
                </div>
                <hr className="my-6 opacity-50"/>
                <div className="space-y-2 text-sm">
                     {personal.email && <div className="flex items-center gap-2"><MailIcon size={14}/><span>{personal.email}</span></div>}
                     {personal.phone && <div className="flex items-center gap-2"><PhoneIcon size={14}/><span>{personal.phone}</span></div>}
                     {cvData.sectionVisibility.socialLinks && socialLinks.map(link => (
                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                            {socialIconMap[link.network.toLowerCase()] || <WebsiteIcon size={14} />}
                            <span>{link.network === 'Website' ? personal.website : link.network}</span>
                        </a>
                    ))}
                </div>
                <div className="mt-6 space-y-6">
                 {asideSections.map((key) => {
                    if (!cvData.sectionVisibility[key]) return null;
                    const Component = sectionComponentMap[key];
                    if (!Component) return null;
                    const creativeTheme = {...theme, color: {...theme.color, primary: theme.color.headerText, secondary: theme.color.headerText, text: theme.color.headerText}}
                    return <Component key={key} cvData={cvData} theme={creativeTheme} />;
                 })}
                </div>
            </aside>
            <main className="w-2/3 p-8 space-y-6">
                {mainSections.map((key) => {
                    if (!cvData.sectionVisibility[key]) return null;
                    const Component = sectionComponentMap[key];
                    if (!Component) return null;
                    return <Component key={key} cvData={cvData} theme={theme} />;
                 })}
                 {cvData.sectionVisibility.customSections && <CustomSections cvData={cvData} theme={theme} />}
            </main>
        </div>
    );
};

const CompactTemplate: React.FC<PreviewProps> = ({ cvData, theme }) => {
     const { personal, socialLinks } = cvData;
     const compactTheme = {...theme, skillDisplayStyle: 'tags' as 'tags'}; // Force tags for compact view
    return (
        <div className="bg-white shadow-lg p-6 md:p-8 text-sm">
            <header className="text-center mb-4">
                <h1 className="text-3xl font-bold" style={{ color: theme.color.primary }}>{personal.name}</h1>
                <p className="text-lg font-medium" style={{ color: theme.color.secondary }}>{personal.jobTitle}</p>
                <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs">
                    {personal.email && <span className="flex items-center gap-1"><MailIcon size={12}/>{personal.email}</span>}
                    {personal.phone && <span className="flex items-center gap-1"><PhoneIcon size={12}/>{personal.phone}</span>}
                    {cvData.sectionVisibility.socialLinks && socialLinks.map(link => (
                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            {React.cloneElement(socialIconMap[link.network.toLowerCase()] as any, {size: 12})}
                            <span>{link.network}</span>
                        </a>
                    ))}
                </div>
            </header>
            <main className="space-y-4">
                {renderSections(cvData, compactTheme)}
            </main>
        </div>
    );
};

const templateMap: Record<ThemeSettings['template'], React.ComponentType<PreviewProps>> = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    creative: CreativeTemplate,
    compact: CompactTemplate,
};

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ cvData, theme, t }, ref) => {
  const TemplateComponent = templateMap[theme.template] || ModernTemplate;
  return (
    <div ref={ref}>
        <TemplateComponent cvData={cvData} theme={theme} t={t} />
    </div>
  );
});

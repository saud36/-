import { CVData, ColorPalette } from './types';
import { v4 as uuidv4 } from 'uuid';

export const initialCVData: CVData = {
  personal: {
    name: 'Alex Doe',
    jobTitle: 'Senior Frontend Developer',
    email: 'alex.doe@example.com',
    phone: '+1 (555) 123-4567',
    website: 'alexdoe.dev',
    photo: 'https://picsum.photos/200',
  },
  socialLinks: [
    { id: uuidv4(), network: 'LinkedIn', url: 'https://linkedin.com/in/alexdoe' },
    { id: uuidv4(), network: 'GitHub', url: 'https://github.com/alexdoe' },
  ],
  summary: 'A passionate and creative frontend developer with 8+ years of experience in building responsive and user-friendly web applications using modern technologies like React, TypeScript, and Next.js. Proven ability to lead projects, mentor junior developers, and collaborate effectively with cross-functional teams to deliver high-quality products.',
  experience: [
    {
      id: uuidv4(),
      company: 'Innovate Inc.',
      position: 'Senior Frontend Developer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '• Led the development of a new design system, improving consistency and reducing development time by 30%.\n• Architected and built a complex single-page application for data visualization.\n• Mentored a team of 4 junior developers, fostering their growth and skills.',
    },
    {
      id: uuidv4(),
      company: 'Tech Solutions LLC',
      position: 'Frontend Developer',
      startDate: 'Jun 2016',
      endDate: 'Dec 2019',
      description: '• Developed and maintained client-facing websites using React and Redux.\n• Collaborated with UI/UX designers to translate wireframes into high-quality code.\n• Improved website performance by 20% through code optimization and lazy loading techniques.',
    },
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      graduationDate: 'May 2016',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: uuidv4(), name: 'React', level: 95 },
    { id: uuidv4(), name: 'TypeScript', level: 90 },
    { id: uuidv4(), name: 'Node.js', level: 75 },
    { id: uuidv4(), name: 'UI/UX Design', level: 80 },
    { id: uuidv4(), name: 'Tailwind CSS', level: 95 },
  ],
  languages: [
    { id: uuidv4(), name: 'English', proficiency: 'Native' },
    { id: uuidv4(), name: 'Spanish', proficiency: 'Advanced' },
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'Project Alpha',
      url: 'https://github.com/alexdoe/project-alpha',
      description: 'A personal portfolio website built with Next.js and deployed on Vercel.',
    },
  ],
  customSections: [],
};

export const initialCVDataAr: CVData = {
  personal: {
    name: 'أليكس دو',
    jobTitle: 'مطوّر واجهات أمامية أول',
    email: 'alex.doe@example.com',
    phone: '+1 (555) 123-4567',
    website: 'alexdoe.dev',
    photo: 'https://picsum.photos/200',
  },
  socialLinks: [
    { id: uuidv4(), network: 'LinkedIn', url: 'https://linkedin.com/in/alexdoe' },
    { id: uuidv4(), network: 'GitHub', url: 'https://github.com/alexdoe' },
  ],
  summary: 'مطوّر واجهات أمامية شغوف ومبدع يتمتع بخبرة تزيد عن 8 سنوات في بناء تطبيقات ويب سريعة الاستجابة وسهلة الاستخدام باستخدام تقنيات حديثة مثل React و TypeScript و Next.js. لديه قدرة مثبتة على قيادة المشاريع وتوجيه المطورين المبتدئين والتعاون بفعالية مع الفرق متعددة الوظائف لتقديم منتجات عالية الجودة.',
  experience: [
    {
      id: uuidv4(),
      company: 'شركة إينوفيت',
      position: 'مطوّر واجهات أمامية أول',
      startDate: 'يناير 2020',
      endDate: 'الحاضر',
      description: '• قاد تطوير نظام تصميم جديد، مما أدى إلى تحسين الاتساق وتقليل وقت التطوير بنسبة 30%.\n• صمم وبنى تطبيق صفحة واحدة معقد لتصور البيانات.\n• أشرف على فريق من 4 مطورين مبتدئين، مما عزز نموهم ومهاراتهم.',
    },
    {
      id: uuidv4(),
      company: 'حلول التكنولوجيا المحدودة',
      position: 'مطوّر واجهات أمامية',
      startDate: 'يونيو 2016',
      endDate: 'ديسمبر 2019',
      description: '• طوّر وصان مواقع ويب موجهة للعملاء باستخدام React و Redux.\n• تعاون مع مصممي واجهة المستخدم وتجربة المستخدم لترجمة النماذج الأولية إلى كود عالي الجودة.\n• حسّن أداء الموقع بنسبة 20% من خلال تحسين الكود وتقنيات التحميل الكسول.',
    },
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'جامعة الولاية',
      degree: 'بكالوريوس في علوم الحاسب',
      graduationDate: 'مايو 2016',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: uuidv4(), name: 'React', level: 95 },
    { id: uuidv4(), name: 'TypeScript', level: 90 },
    { id: uuidv4(), name: 'Node.js', level: 75 },
    { id: uuidv4(), name: 'تصميم UI/UX', level: 80 },
    { id: uuidv4(), name: 'Tailwind CSS', level: 95 },
  ],
  languages: [
    { id: uuidv4(), name: 'الإنجليزية', proficiency: 'Native' },
    { id: uuidv4(), name: 'الإسبانية', proficiency: 'Advanced' },
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'مشروع ألفا',
      url: 'https://github.com/alexdoe/project-alpha',
      description: 'موقع شخصي تم بناؤه باستخدام Next.js ونشره على Vercel.',
    },
  ],
  customSections: [],
};


export const THEMES: { name: string, colors: ColorPalette }[] = [
  { 
    name: 'Default Blue', 
    colors: { primary: '#2563eb', secondary: '#4f46e5', background: '#ffffff', text: '#374151', headerText: '#ffffff' }
  },
  {
    name: 'Forest Green',
    colors: { primary: '#166534', secondary: '#15803d', background: '#ffffff', text: '#374151', headerText: '#ffffff' }
  },
  {
    name: 'Modern Slate',
    colors: { primary: '#475569', secondary: '#64748b', background: '#f8fafc', text: '#1e293b', headerText: '#ffffff' }
  },
  {
    name: 'Crimson Red',
    colors: { primary: '#dc2626', secondary: '#b91c1c', background: '#ffffff', text: '#374151', headerText: '#ffffff' }
  },
  {
    name: 'Professional Graphite',
    colors: { primary: '#334155', secondary: '#1e293b', background: '#ffffff', text: '#111827', headerText: '#f1f5f9'}
  },
];

export const FONTS = [
  { name: 'Inter', value: 'inter' },
  { name: 'Lora', value: 'lora' },
  { name: 'Roboto', value: 'roboto' },
  { name: 'Source Sans Pro', value: 'source-sans-pro' },
];

export const LANGUAGE_PROFICIENCY = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'];
export const LANGUAGE_PROFICIENCY_AR = ['مبتدئ', 'متوسط', 'متقدم', 'بطلاقة', 'لغة أم'];

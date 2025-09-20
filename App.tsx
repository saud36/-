
import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Preview } from './components/Preview';
import { useCvData } from './hooks/useCvData';
import { CVData, ThemeSettings } from './types';
import { THEMES, FONTS, initialCVData, initialCVDataAr } from './constants';
import { exportToPdf } from './services/pdfService';
import { DownloadIcon, UploadIcon, MoonIcon, SunIcon, MenuIcon, XIcon, GlobeIcon } from './components/Icons';
import { useTranslation } from './hooks/useTranslation';

const App: React.FC = () => {
  const { lang, setLang, t } = useTranslation();
  const { cvData, setCvData, updateCvData } = useCvData(initialCVData);
  const [theme, setTheme] = useState<ThemeSettings>({
    color: THEMES[0].colors,
    font: FONTS[0].value,
    template: 'modern',
    skillDisplayStyle: 'bar',
    sectionDividerStyle: 'solid',
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLangMenuOpen, setisLangMenuOpen] = useState(false);

  const cvPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('cv-theme');
    if (savedTheme) {
      setTheme(prev => ({ ...prev, ...JSON.parse(savedTheme) }));
    }
    const savedDarkMode = localStorage.getItem('cv-dark-mode');
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode);
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cv-theme', JSON.stringify(theme));
  }, [theme]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const isDark = !prev;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('cv-dark-mode', JSON.stringify(isDark));
      return isDark;
    });
  };

  const handleJsonImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const importedData: CVData = JSON.parse(content);
            setCvData(importedData);
            alert(t.alerts.importSuccess);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert(t.alerts.importError);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonExport = () => {
    const jsonString = JSON.stringify(cvData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    if (window.confirm(t.alerts.resetConfirmation)) {
      const dataToReset = lang === 'ar' ? initialCVDataAr : initialCVData;
      setCvData(dataToReset);
    }
  };

  return (
    <div className={`font-${lang === 'ar' ? 'noto-sans-arabic' : theme.font} transition-colors duration-300`}>
      <header className="fixed top-0 start-0 end-0 h-16 bg-white dark:bg-custom-gray-900 border-b border-custom-gray-200 dark:border-custom-gray-700 z-30 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-custom-gray-600 dark:text-custom-gray-300 hover:bg-custom-gray-100 dark:hover:bg-custom-gray-800 lg:hidden"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <XIcon /> : <MenuIcon />}
          </button>
          <h1 className="text-xl font-bold text-custom-gray-800 dark:text-custom-gray-100">{t.header.title}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <input type="file" id="import-json" className="hidden" accept=".json" onChange={handleJsonImport} />
          <label htmlFor="import-json" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-custom-gray-700 dark:text-custom-gray-200 bg-custom-gray-100 dark:bg-custom-gray-800 rounded-md hover:bg-custom-gray-200 dark:hover:bg-custom-gray-700 cursor-pointer transition-colors">
            <UploadIcon />
            <span className="hidden sm:inline">{t.header.import}</span>
          </label>
          <button onClick={handleJsonExport} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-custom-gray-700 dark:text-custom-gray-200 bg-custom-gray-100 dark:bg-custom-gray-800 rounded-md hover:bg-custom-gray-200 dark:hover:bg-custom-gray-700 transition-colors">
            <DownloadIcon />
            <span className="hidden sm:inline">{t.header.export}</span>
          </button>
          <button onClick={() => exportToPdf(cvPreviewRef, cvData.personal.name)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
            <DownloadIcon />
            <span className="hidden sm:inline">{t.header.exportPdf}</span>
          </button>
          
          <div className="relative">
            <button onClick={() => setisLangMenuOpen(!isLangMenuOpen)} className="p-2 rounded-full hover:bg-custom-gray-100 dark:hover:bg-custom-gray-800 text-custom-gray-600 dark:text-custom-gray-300 transition-colors">
              <GlobeIcon />
            </button>
            {isLangMenuOpen && (
              <div className="absolute end-0 mt-2 w-32 bg-white dark:bg-custom-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <button onClick={() => { setLang('en'); setisLangMenuOpen(false); }} className={`block w-full text-start px-4 py-2 text-sm ${lang === 'en' ? 'bg-blue-500 text-white' : 'text-custom-gray-700 dark:text-custom-gray-200'} hover:bg-custom-gray-100 dark:hover:bg-custom-gray-700`}>English</button>
                <button onClick={() => { setLang('ar'); setisLangMenuOpen(false); }} className={`block w-full text-start px-4 py-2 text-sm ${lang === 'ar' ? 'bg-blue-500 text-white' : 'text-custom-gray-700 dark:text-custom-gray-200'} hover:bg-custom-gray-100 dark:hover:bg-custom-gray-700`}>العربية</button>
              </div>
            )}
          </div>
          
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-custom-gray-100 dark:hover:bg-custom-gray-800 text-custom-gray-600 dark:text-custom-gray-300 transition-colors">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main className="flex pt-16 h-screen">
        <aside className={`fixed lg:relative top-16 lg:top-0 bottom-0 lg:h-auto z-20 w-80 lg:w-96 bg-white dark:bg-custom-gray-900 border-e border-custom-gray-200 dark:border-custom-gray-700 rtl:border-e-0 rtl:border-s transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'} lg:translate-x-0`}>
          <Sidebar
            cvData={cvData}
            onUpdate={updateCvData}
            onReset={handleReset}
            theme={theme}
            onThemeChange={setTheme}
            t={t}
          />
        </aside>
        <div className="flex-1 p-4 lg:p-10 overflow-y-auto bg-custom-gray-100 dark:bg-custom-gray-800">
           <div className="max-w-[8.5in] mx-auto">
                <Preview ref={cvPreviewRef} cvData={cvData} theme={theme} t={t} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;

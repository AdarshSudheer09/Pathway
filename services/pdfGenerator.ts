import RNPrint from 'react-native-print';
import { ResumeData, BragSheetData, UserProfile } from '../types';

// Helper function to parse date strings like "June 2024", "Present", "2023-2024"
// For sorting, we want to use the LATER date (end date) from a range
const parseDateForSorting = (dateStr: string): number => {
  if (!dateStr) return 0;

  // Handle "Present" - give it the highest value (future date)
  if (dateStr.toLowerCase().includes('present')) {
    return new Date(2099, 11).getTime();
  }

  // Handle date ranges like "June 2023 - August 2024" or "2023 - 2024"
  // Use the LAST date (end date, which is the most recent)
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-').map(s => s.trim());
    dateStr = parts[parts.length - 1]; // Use the end date for sorting
  }

  // Month name to number mapping (1-12)
  const monthMap: { [key: string]: number } = {
    'january': 0, 'jan': 0,
    'february': 1, 'feb': 1,
    'march': 2, 'mar': 2,
    'april': 3, 'apr': 3,
    'may': 4,
    'june': 5, 'jun': 5,
    'july': 6, 'jul': 6,
    'august': 7, 'aug': 7,
    'september': 8, 'sep': 8, 'sept': 8,
    'october': 9, 'oct': 9,
    'november': 10, 'nov': 10,
    'december': 11, 'dec': 11
  };

  // Extract month and year from formats like "June 2024", "August 2026", etc.
  const lowerStr = dateStr.toLowerCase().trim();
  let month = 0; // Default to January
  let year = 0;

  // Try to find a month name
  for (const [monthName, monthNum] of Object.entries(monthMap)) {
    if (lowerStr.includes(monthName)) {
      month = monthNum;
      break;
    }
  }

  // Extract year (4 digits)
  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) {
    year = parseInt(yearMatch[0]);
  }

  // If we found a year, create a proper date with the month
  if (year > 0) {
    return new Date(year, month).getTime();
  }

  // Last resort: try to parse as a full date string
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.getTime();
  }

  return 0;
};

export const generateResumePDF = async (
  resumeData: ResumeData,
  profile: UserProfile
): Promise<string> => {
  // Sort experience and projects by END DATE ONLY (LATEST FIRST)
  // If both have "Present", use START DATE as tiebreaker
  const sortedExperience = [...resumeData.experience].sort((a, b) => {
    const endDateA = a.dates.split(' - ').pop() || '';
    const endDateB = b.dates.split(' - ').pop() || '';
    const endTimeA = parseDateForSorting(endDateA);
    const endTimeB = parseDateForSorting(endDateB);

    if (endTimeB !== endTimeA) {
      return endTimeB - endTimeA;
    }

    const startDateA = a.dates.split(' - ')[0] || '';
    const startDateB = b.dates.split(' - ')[0] || '';
    return parseDateForSorting(startDateB) - parseDateForSorting(startDateA);
  }); // All experiences included - will fit on one page with compact styling

  const sortedProjects = resumeData.projects ? [...resumeData.projects].sort((a, b) => {
    const endDateA = a.dates.split(' - ').pop() || '';
    const endDateB = b.dates.split(' - ').pop() || '';
    const endTimeA = parseDateForSorting(endDateA);
    const endTimeB = parseDateForSorting(endDateB);

    if (endTimeB !== endTimeA) {
      return endTimeB - endTimeA;
    }

    const startDateA = a.dates.split(' - ')[0] || '';
    const startDateB = b.dates.split(' - ')[0] || '';
    return parseDateForSorting(startDateB) - parseDateForSorting(startDateA);
  }) : [];
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @page {
          size: letter;
          margin: 0.5in;
        }
        body { 
          font-family: -apple-system, Arial, sans-serif; 
          padding: 15px; 
          font-size: 9pt;
          line-height: 1.2;
          max-height: 10in;
          overflow: hidden;
        }
        h1 { 
          text-align: center; 
          font-size: 18pt; 
          margin-bottom: 3px; 
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .contact { 
          text-align: center; 
          color: #666; 
          margin-bottom: 12px; 
          font-size: 8pt;
        }
        h2 { 
          font-size: 10pt; 
          border-bottom: 1.5px solid #000; 
          margin-top: 10px;
          margin-bottom: 5px;
          padding-bottom: 2px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .item { 
          margin-bottom: 6px; 
          page-break-inside: avoid;
        }
        .item-header { 
          display: flex; 
          justify-content: space-between; 
          font-size: 8pt;
        }
        .role { 
          font-weight: bold; 
          font-size: 9pt;
        }
        .date {
          color: #666;
          font-size: 8pt;
        }
        .org { 
          font-style: italic; 
          margin-bottom: 2px; 
          color: #444;
          font-size: 8pt;
        }
        .skills-text {
          font-size: 8pt;
          color: #444;
          margin-bottom: 2px;
        }
        ul { 
          margin: 2px 0; 
          padding-left: 15px; 
        }
        li { 
          margin-bottom: 1px; 
          font-size: 8pt;
          line-height: 1.3;
        }
        .summary {
          font-size: 8pt;
          margin-bottom: 10px;
          line-height: 1.3;
        }
      </style>
    </head>
    <body>
      <h1>${profile.name}</h1>
      <div class="contact">${profile.email} | ${profile.graduatingClass || `Class of ${profile.graduationYear}`}</div>
      
      <h2>Experience</h2>
      ${sortedExperience.map(exp => `
        <div class="item">
          <div class="item-header">
            <span class="role">${exp.role}</span>
            <span class="date">${exp.dates}</span>
          </div>
          <div class="org">${exp.organization}</div>
          <ul>
            ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
      
      ${sortedProjects && sortedProjects.length > 0 ? `
        <h2>Projects</h2>
        ${sortedProjects.map(proj => `
          <div class="item">
            <div class="item-header">
              <span class="role">${proj.title}</span>
              <span class="date">${proj.dates}</span>
            </div>
            ${proj.skills ? `<div class="skills-text">${proj.skills}</div>` : ''}
            ${proj.bullets && proj.bullets.length > 0 ? `
              <ul>
                ${proj.bullets.map(b => `<li>${b}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      ` : ''}
      
      ${resumeData.skills && resumeData.skills.length > 0 ? `
        <h2>Skills</h2>
        <p style="font-size: 10pt;">${resumeData.skills.join(', ')}</p>
      ` : ''}
      
      ${resumeData.awards && resumeData.awards.length > 0 ? `
        <h2>Awards & Honors</h2>
        <ul>
          ${resumeData.awards.map(a => `<li>${a}</li>`).join('')}
        </ul>
      ` : ''}
    </body>
    </html>
  `;

  try {
    const nameParts = profile.name.split(' ');
    const firstName = nameParts[0] || 'Resume';
    const lastName = nameParts[nameParts.length - 1] || '';
    const documentName = lastName ? `${firstName}_${lastName}_Resume` : `${firstName}_Resume`;

    await RNPrint.print({
      html,
      jobName: documentName
    });
    return 'printed';
  } catch (error) {
    console.error('Error printing resume:', error);
    return '';
  }
};

export const generateBragSheetPDF = async (
  bragSheetData: BragSheetData,
  profile: UserProfile
): Promise<string> => {
  // Sort key experiences by date if they have associated activities with dates
  // For now, we'll maintain the order they're provided in, but you can add date fields
  // to keyExperiences in the future for proper sorting
  const sortedKeyExperiences = bragSheetData.keyExperiences || [];
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          font-family: -apple-system, Arial, sans-serif; 
          padding: 20px; 
          font-size: 11pt;
          line-height: 1.5;
        }
        h1 { 
          text-align: center; 
          font-size: 24pt; 
          margin-bottom: 5px; 
          text-transform: uppercase;
        }
        .contact { 
          text-align: center; 
          color: #666; 
          margin-bottom: 20px; 
          font-size: 10pt;
        }
        h2 { 
          font-size: 12pt; 
          border-bottom: 2px solid #000; 
          margin-top: 16px;
          margin-bottom: 8px;
          padding-bottom: 3px;
          text-transform: uppercase;
        }
        .section { 
          margin-bottom: 16px; 
          page-break-inside: avoid;
        }
        .exp-title {
          font-weight: bold;
          margin-bottom: 6px;
          font-size: 11pt;
        }
        .narrative {
          font-size: 10pt;
          line-height: 1.5;
          color: #333;
        }
        .qualities {
          font-size: 10pt;
          color: #444;
        }
      </style>
    </head>
    <body>
      <h1>${profile.name}</h1>
      <div class="contact">Target Major: ${profile.targetMajor}</div>
      
      <h2>About Me</h2>
      <div class="section">
        <p class="narrative">${bragSheetData.introaryStatement}</p>
      </div>
      
      ${bragSheetData.academicHighlight ? `
        <h2>Academic Highlights</h2>
        <div class="section">
          <p class="narrative">${bragSheetData.academicHighlight}</p>
        </div>
      ` : ''}
      
      ${sortedKeyExperiences && sortedKeyExperiences.length > 0 ? `
        <h2>Key Experiences</h2>
        ${sortedKeyExperiences.map(exp => `
          <div class="section">
            <div class="exp-title">${exp.title}</div>
            <p class="narrative">${exp.narrative}</p>
          </div>
        `).join('')}
      ` : ''}
      
      ${bragSheetData.personalQualities && bragSheetData.personalQualities.length > 0 ? `
        <h2>Personal Qualities</h2>
        <p class="qualities">${bragSheetData.personalQualities.join(', ')}</p>
      ` : ''}
    </body>
    </html>
  `;

  try {
    const nameParts = profile.name.split(' ');
    const firstName = nameParts[0] || 'BragSheet';
    const lastName = nameParts[nameParts.length - 1] || '';
    const documentName = lastName ? `${firstName}_${lastName}_BragSheet` : `${firstName}_BragSheet`;

    await RNPrint.print({
      html,
      jobName: documentName
    });
    return 'printed';
  } catch (error) {
    console.error('Error printing brag sheet:', error);
    return '';
  }
};

import React, { useState } from 'react';
import { Sparkles, Briefcase, ArrowRight, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';

const VibeCareerMatcher = () => {
  const [step, setStep] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [vibeScores, setVibeScores] = useState({});
  const [careerMatches, setCareerMatches] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [jobs, setJobs] = useState({});
  const [loadingJobs, setLoadingJobs] = useState({});
  const [userLocation, setUserLocation] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const vibeQuestions = [
    {
      id: 'environment',
      question: 'What environment makes you feel most alive?',
      options: [
        { id: 'cozy-indoor', label: 'Cozy Study', image: '📚', vibes: { creative: 3, analytical: 4, people: 1, hands_on: 2, structure: 4, innovation: 3 } },
        { id: 'urban-street', label: 'Urban Streets', image: '🏙️', vibes: { creative: 4, analytical: 1, people: 4, hands_on: 3, structure: 2, innovation: 4 } },
        { id: 'nature', label: 'Outdoorsy', image: '🌲', vibes: { creative: 2, analytical: 2, people: 2, hands_on: 5, structure: 2, innovation: 3 } },
        { id: 'tech-hub', label: 'Tech Hub', image: '💻', vibes: { creative: 3, analytical: 5, people: 2, hands_on: 2, structure: 3, innovation: 5 } }
      ]
    },
    {
      id: 'style',
      question: 'Which aesthetic speaks to you?',
      options: [
        { id: 'minimalist', label: 'Minimalist', image: '⚪', vibes: { creative: 3, analytical: 4, people: 2, hands_on: 2, structure: 5, innovation: 3 } },
        { id: 'streetwear', label: 'Streetwear', image: '👟', vibes: { creative: 5, analytical: 1, people: 4, hands_on: 3, structure: 2, innovation: 4 } },
        { id: 'vintage', label: 'Retro Tech', image: '📼', vibes: { creative: 4, analytical: 3, people: 2, hands_on: 4, structure: 3, innovation: 3 } },
        { id: 'professional', label: 'Corporate Chic', image: '💼', vibes: { creative: 2, analytical: 4, people: 5, hands_on: 1, structure: 5, innovation: 2 } }
      ]
    },
    {
      id: 'activity',
      question: 'How do you prefer to spend your time?',
      options: [
        { id: 'creating', label: 'Creating Art', image: '🎨', vibes: { creative: 5, analytical: 1, people: 2, hands_on: 4, structure: 2, innovation: 4 } },
        { id: 'analyzing', label: 'Solving Puzzles', image: '🧩', vibes: { creative: 2, analytical: 5, people: 1, hands_on: 2, structure: 4, innovation: 3 } },
        { id: 'socializing', label: 'Meeting People', image: '🤝', vibes: { creative: 2, analytical: 2, people: 5, hands_on: 2, structure: 3, innovation: 3 } },
        { id: 'building', label: 'Building Things', image: '🔧', vibes: { creative: 3, analytical: 3, people: 1, hands_on: 5, structure: 3, innovation: 4 } }
      ]
    },
    {
      id: 'pace',
      question: 'What pace suits you best?',
      options: [
        { id: 'fast', label: 'Fast & Dynamic', image: '⚡', vibes: { creative: 3, analytical: 2, people: 4, hands_on: 4, structure: 2, innovation: 4 } },
        { id: 'steady', label: 'Steady & Focused', image: '🎯', vibes: { creative: 2, analytical: 5, people: 2, hands_on: 3, structure: 5, innovation: 2 } },
        { id: 'flexible', label: 'Flexible & Varied', image: '🌊', vibes: { creative: 4, analytical: 2, people: 3, hands_on: 3, structure: 2, innovation: 4 } },
        { id: 'calm', label: 'Calm & Thoughtful', image: '🧘', vibes: { creative: 4, analytical: 4, people: 2, hands_on: 2, structure: 4, innovation: 3 } }
      ]
    },
    {
      id: 'work_style',
      question: 'How do you like to work?',
      options: [
        { id: 'team', label: 'Collaborative Team', image: '👥', vibes: { creative: 3, analytical: 3, people: 5, hands_on: 2, structure: 3, innovation: 3 } },
        { id: 'solo', label: 'Independent Solo', image: '🎧', vibes: { creative: 4, analytical: 4, people: 1, hands_on: 3, structure: 3, innovation: 4 } },
        { id: 'hybrid', label: 'Mix of Both', image: '🔄', vibes: { creative: 3, analytical: 3, people: 3, hands_on: 3, structure: 3, innovation: 3 } },
        { id: 'leading', label: 'Leading Others', image: '🎖️', vibes: { creative: 3, analytical: 3, people: 5, hands_on: 2, structure: 4, innovation: 3 } }
      ]
    },
    {
      id: 'problem_solving',
      question: 'What kind of problems excite you?',
      options: [
        { id: 'technical', label: 'Technical Challenges', image: '⚙️', vibes: { creative: 2, analytical: 5, people: 1, hands_on: 3, structure: 4, innovation: 4 } },
        { id: 'creative', label: 'Creative Challenges', image: '💡', vibes: { creative: 5, analytical: 2, people: 3, hands_on: 3, structure: 2, innovation: 5 } },
        { id: 'human', label: 'People Problems', image: '❤️', vibes: { creative: 3, analytical: 2, people: 5, hands_on: 2, structure: 3, innovation: 3 } },
        { id: 'systematic', label: 'Process Optimization', image: '📊', vibes: { creative: 2, analytical: 5, people: 2, hands_on: 2, structure: 5, innovation: 3 } }
      ]
    },
    {
      id: 'learning',
      question: 'How do you prefer to learn new things?',
      options: [
        { id: 'doing', label: 'Hands-On Practice', image: '🛠️', vibes: { creative: 3, analytical: 2, people: 2, hands_on: 5, structure: 2, innovation: 3 } },
        { id: 'reading', label: 'Books & Research', image: '📖', vibes: { creative: 3, analytical: 5, people: 1, hands_on: 2, structure: 4, innovation: 3 } },
        { id: 'watching', label: 'Videos & Tutorials', image: '📹', vibes: { creative: 3, analytical: 3, people: 2, hands_on: 3, structure: 3, innovation: 3 } },
        { id: 'teaching', label: 'Teaching Others', image: '👨‍🏫', vibes: { creative: 3, analytical: 3, people: 5, hands_on: 2, structure: 3, innovation: 3 } }
      ]
    }
  ];

  const careerDatabase = [
    { title: 'UX/UI Designer', industry: 'Tech & Design', vibeMatch: { creative: 5, analytical: 3, people: 3, hands_on: 3, structure: 3, innovation: 5 }, description: 'Design beautiful, user-friendly digital experiences', skills: ['Figma', 'User Research', 'Prototyping', 'Adobe XD'], avgSalary: '$75,000 - $110,000', searchTerms: ['ux designer', 'ui designer', 'product designer'] },
    { title: 'Data Analyst', industry: 'Technology', vibeMatch: { creative: 2, analytical: 5, people: 2, hands_on: 2, structure: 5, innovation: 3 }, description: 'Transform data into actionable insights', skills: ['SQL', 'Python', 'Tableau', 'Excel'], avgSalary: '$65,000 - $95,000', searchTerms: ['data analyst', 'business analyst', 'data scientist'] },
    { title: 'Marketing Coordinator', industry: 'Marketing & Communications', vibeMatch: { creative: 4, analytical: 2, people: 5, hands_on: 2, structure: 3, innovation: 4 }, description: 'Connect brands with audiences through creative campaigns', skills: ['Social Media', 'Content Creation', 'Analytics', 'Copywriting'], avgSalary: '$50,000 - $70,000', searchTerms: ['marketing coordinator', 'marketing specialist', 'digital marketing'] },
    { title: 'Software Developer', industry: 'Technology', vibeMatch: { creative: 3, analytical: 5, people: 2, hands_on: 4, structure: 4, innovation: 5 }, description: 'Build applications and solve technical challenges', skills: ['JavaScript', 'React', 'Git', 'APIs'], avgSalary: '$80,000 - $120,000', searchTerms: ['software developer', 'software engineer', 'full stack developer'] },
    { title: 'Environmental Scientist', industry: 'Science & Environment', vibeMatch: { creative: 2, analytical: 4, people: 2, hands_on: 5, structure: 4, innovation: 3 }, description: 'Protect and study the natural world', skills: ['Field Research', 'Data Analysis', 'GIS', 'Lab Work'], avgSalary: '$55,000 - $85,000', searchTerms: ['environmental scientist', 'ecologist', 'sustainability specialist'] },
    { title: 'Content Creator', industry: 'Media & Entertainment', vibeMatch: { creative: 5, analytical: 2, people: 4, hands_on: 4, structure: 2, innovation: 5 }, description: 'Create engaging content across digital platforms', skills: ['Video Editing', 'Photography', 'Storytelling', 'Social Media'], avgSalary: '$45,000 - $80,000', searchTerms: ['content creator', 'social media manager', 'video producer'] },
    { title: 'Product Manager', industry: 'Technology', vibeMatch: { creative: 3, analytical: 4, people: 5, hands_on: 2, structure: 4, innovation: 4 }, description: 'Lead product strategy and cross-functional teams', skills: ['Roadmapping', 'Stakeholder Management', 'Agile', 'Analytics'], avgSalary: '$90,000 - $140,000', searchTerms: ['product manager', 'associate product manager', 'product owner'] },
    { title: 'Graphic Designer', industry: 'Creative & Design', vibeMatch: { creative: 5, analytical: 2, people: 3, hands_on: 4, structure: 3, innovation: 4 }, description: 'Create visual concepts for brands and media', skills: ['Adobe Creative Suite', 'Typography', 'Branding', 'Illustration'], avgSalary: '$50,000 - $75,000', searchTerms: ['graphic designer', 'visual designer', 'brand designer'] },
    { title: 'Sales Representative', industry: 'Sales & Business Development', vibeMatch: { creative: 3, analytical: 2, people: 5, hands_on: 3, structure: 3, innovation: 3 }, description: 'Build relationships and drive revenue growth', skills: ['Communication', 'Negotiation', 'CRM', 'Presentation'], avgSalary: '$55,000 - $85,000', searchTerms: ['sales representative', 'account executive', 'business development'] },
    { title: 'Mechanical Engineer', industry: 'Engineering', vibeMatch: { creative: 3, analytical: 5, people: 2, hands_on: 5, structure: 5, innovation: 4 }, description: 'Design and develop mechanical systems', skills: ['CAD', 'Prototyping', 'Materials', 'Testing'], avgSalary: '$70,000 - $95,000', searchTerms: ['mechanical engineer', 'design engineer', 'manufacturing engineer'] },
    { title: 'HR Specialist', industry: 'Human Resources', vibeMatch: { creative: 2, analytical: 3, people: 5, hands_on: 2, structure: 5, innovation: 2 }, description: 'Support employee experience and organizational culture', skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Compliance'], avgSalary: '$50,000 - $70,000', searchTerms: ['hr specialist', 'human resources coordinator', 'recruiter'] },
    { title: 'Physical Therapist', industry: 'Healthcare', vibeMatch: { creative: 2, analytical: 4, people: 5, hands_on: 5, structure: 4, innovation: 3 }, description: 'Help patients recover movement and manage pain', skills: ['Anatomy', 'Patient Care', 'Rehabilitation', 'Communication'], avgSalary: '$75,000 - $95,000', searchTerms: ['physical therapist', 'occupational therapist', 'rehabilitation specialist'] },
    { title: 'Financial Analyst', industry: 'Finance', vibeMatch: { creative: 2, analytical: 5, people: 3, hands_on: 2, structure: 5, innovation: 2 }, description: 'Analyze financial data to guide business decisions', skills: ['Excel', 'Financial Modeling', 'SQL', 'Forecasting'], avgSalary: '$65,000 - $90,000', searchTerms: ['financial analyst', 'investment analyst', 'business analyst'] },
    { title: 'Cybersecurity Analyst', industry: 'Technology & Security', vibeMatch: { creative: 2, analytical: 5, people: 2, hands_on: 3, structure: 5, innovation: 4 }, description: 'Protect systems and data from cyber threats', skills: ['Network Security', 'Incident Response', 'Python', 'Ethical Hacking'], avgSalary: '$75,000 - $110,000', searchTerms: ['cybersecurity analyst', 'security analyst', 'information security'] },
    { title: 'Social Media Manager', industry: 'Marketing & Communications', vibeMatch: { creative: 5, analytical: 3, people: 4, hands_on: 3, structure: 3, innovation: 4 }, description: 'Build and engage online communities for brands', skills: ['Content Strategy', 'Analytics', 'Copywriting', 'Community Management'], avgSalary: '$50,000 - $75,000', searchTerms: ['social media manager', 'community manager', 'digital marketing manager'] },
    { title: 'Architecture Designer', industry: 'Architecture & Design', vibeMatch: { creative: 5, analytical: 4, people: 3, hands_on: 4, structure: 4, innovation: 4 }, description: 'Design buildings and spaces that inspire', skills: ['AutoCAD', 'Revit', '3D Modeling', 'Building Codes'], avgSalary: '$60,000 - $85,000', searchTerms: ['architect', 'architectural designer', 'design architect'] },
    { title: 'Event Coordinator', industry: 'Events & Hospitality', vibeMatch: { creative: 4, analytical: 2, people: 5, hands_on: 4, structure: 3, innovation: 3 }, description: 'Plan and execute memorable events and experiences', skills: ['Project Management', 'Vendor Relations', 'Budgeting', 'Logistics'], avgSalary: '$45,000 - $65,000', searchTerms: ['event coordinator', 'event planner', 'event manager'] },
    { title: 'Research Scientist', industry: 'Science & Research', vibeMatch: { creative: 3, analytical: 5, people: 1, hands_on: 4, structure: 4, innovation: 5 }, description: 'Conduct experiments to advance scientific knowledge', skills: ['Research Design', 'Lab Techniques', 'Data Analysis', 'Scientific Writing'], avgSalary: '$65,000 - $95,000', searchTerms: ['research scientist', 'research associate', 'laboratory scientist'] }
  ];

  const handleOptionSelect = (option) => {
    setSelectedCard(option.id);
    setTimeout(() => {
      const newScores = { ...vibeScores };
      Object.keys(option.vibes).forEach(vibe => {
        newScores[vibe] = (newScores[vibe] || 0) + option.vibes[vibe];
      });
      setVibeScores(newScores);
      if (currentQuestion < vibeQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedCard(null);
      } else {
        const matches = calculateMatches(newScores);
        setStep('results');
        if (userEmail) {
          sendResultsEmail(newScores, matches);
        }
      }
    }, 400);
  };

  const calculateMatches = (scores) => {
    const matches = careerDatabase.map(career => {
      let matchScore = 0;
      let totalWeight = 0;
      Object.keys(scores).forEach(vibe => {
        const userScore = scores[vibe] || 0;
        const careerScore = career.vibeMatch[vibe] || 0;
        const weight = userScore;
        matchScore += Math.abs(userScore - careerScore * (vibeQuestions.length * 5 / Object.keys(career.vibeMatch).length)) * weight;
        totalWeight += weight * 10;
      });
      const normalizedScore = totalWeight > 0 ? (matchScore / totalWeight) * 100 : 0;
      return { ...career, matchScore: normalizedScore, matchPercent: Math.max(0, Math.min(100, 100 - normalizedScore)) };
    });
    matches.sort((a, b) => b.matchPercent - a.matchPercent);
    const topMatches = matches.slice(0, 6);
    setCareerMatches(topMatches);
    return topMatches;
  };

  const fetchJobs = async (careerTitle, searchTerms) => {
    setLoadingJobs(prev => ({ ...prev, [careerTitle]: true }));
    try {
      const locationToSend = userLocation.trim() || 'United States';
      const response = await fetch('http://localhost:5001/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: careerTitle, 
          search_terms: searchTerms, 
          location: locationToSend 
        })
      });
      const data = await response.json();
      setJobs(prev => ({ ...prev, [careerTitle]: data.jobs || [] }));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(prev => ({ ...prev, [careerTitle]: [] }));
    } finally {
      setLoadingJobs(prev => ({ ...prev, [careerTitle]: false }));
    }
  };

  const searchJobs = (careerTitle) => {
    const query = encodeURIComponent(careerTitle + ' entry level');
    window.open(`https://www.indeed.com/jobs?q=${query}`, '_blank');
  };

  const sendResultsEmail = async (scores, matches) => {
    try {
      await fetch('http://localhost:5001/api/send-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          vibeScores: scores,
          topMatches: matches.slice(0, 3).map(c => ({
            title: c.title,
            matchPercent: Math.round(c.matchPercent),
            industry: c.industry
          }))
        })
      });
      console.log('Results sent to email!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6"><Sparkles className="w-16 h-16 text-purple-600" /></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Your Vibe Career</h1>
          <p className="text-lg text-gray-600 mb-6">Answer questions about your aesthetic and lifestyle preferences, and we'll match you with careers that align with your unique vibe.</p>
          <div className="mb-8 space-y-4">
            <input
              type="email"
              placeholder="Your email (optional, to receive results)"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-center"
            />
            <input
              type="text"
              placeholder="Your location (optional, e.g., New York, NY)"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-center"
            />
          </div>
          <button onClick={() => setStep('quiz')} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto">Start Your Journey<ArrowRight className="w-5 h-5" /></button>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    const question = vibeQuestions[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-semibold">Question {currentQuestion + 1} of {vibeQuestions.length}</span>
              <div className="flex gap-2">{vibeQuestions.map((_, idx) => (<div key={idx} className={`h-2 w-8 rounded-full transition-all ${idx <= currentQuestion ? 'bg-white' : 'bg-white/30'}`} />))}</div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{question.question}</h2>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {question.options.map((option) => (
                <button key={option.id} onClick={() => handleOptionSelect(option)} className={`p-6 rounded-2xl border-2 transition-all duration-300 ${selectedCard === option.id ? 'border-purple-500 bg-purple-50 scale-95' : 'border-gray-200 hover:border-purple-300 hover:shadow-lg hover:scale-105'}`}>
                  <div className="text-5xl mb-3">{option.image}</div>
                  <div className="text-lg font-semibold text-gray-900">{option.label}</div>
                </button>
              ))}
            </div>
            {currentQuestion > 0 && (<button onClick={() => { setCurrentQuestion(currentQuestion - 1); setSelectedCard(null); }} className="mt-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 mx-auto"><ArrowLeft className="w-4 h-4" />Previous Question</button>)}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4"><Briefcase className="w-16 h-16 text-purple-600" /></div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Perfect Career Matches</h1>
              <p className="text-lg text-gray-600">Based on your vibe, here are careers tailored just for you</p>
              {userEmail && <p className="text-sm text-purple-600 mt-2">✓ Results sent to {userEmail}</p>}
            </div>
            <div className="space-y-6">
              {careerMatches.map((career, idx) => (
                <div key={idx} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-2xl font-bold text-gray-900">{career.title}</h3>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{Math.round(career.matchPercent)}% Match</span>
                      </div>
                      <p className="text-purple-600 font-medium mb-2">{career.industry}</p>
                      <p className="text-gray-600 mb-4">{career.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">{career.skills.map((skill, i) => (<span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{skill}</span>))}</div>
                      <p className="text-sm text-gray-500 font-semibold mb-4">Avg. Salary: {career.avgSalary}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => fetchJobs(career.title, career.searchTerms)} disabled={loadingJobs[career.title]} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">{loadingJobs[career.title] ? (<><Loader2 className="w-4 h-4 animate-spin" />Loading Jobs...</>) : (<>Find Live Jobs<ExternalLink className="w-4 h-4" /></>)}</button>
                    <button onClick={() => searchJobs(career.title)} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200">Search Indeed</button>
                  </div>
                  {jobs[career.title] && jobs[career.title].length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Latest Opportunities:</h4>
                      <div className="space-y-2">
                        {jobs[career.title].slice(0, 3).map((job, i) => (
                          <a key={i} href={job.url} target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-gray-900">{job.title}</p>
                                <p className="text-sm text-gray-600">{job.company}</p>
                                {job.location && <p className="text-xs text-gray-500">{job.location}</p>}
                              </div>
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button onClick={() => { setStep('intro'); setCurrentQuestion(0); setVibeScores({}); setCareerMatches([]); setSelectedCard(null); setJobs({}); }} className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 mx-auto"><ArrowLeft className="w-4 h-4" />Start Over</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default VibeCareerMatcher;
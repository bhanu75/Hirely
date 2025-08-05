import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import { Search, MapPin, Briefcase, Building, Users, BarChart3, Plus, Edit, Trash2, Star, BookmarkPlus, User, LogOut, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';

// Auth Context
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false
  });

  useEffect(() => {
    const token = localStorage.getItem('jobPortalToken');
    const user = localStorage.getItem('jobPortalUser');
    if (token && user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('jobPortalToken', 'mock-jwt-token');
    localStorage.setItem('jobPortalUser', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('jobPortalToken');
    localStorage.removeItem('jobPortalUser');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Mock Data
const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp India',
    location: 'Bangalore',
    experience: '2-5 years',
    salary: '8-15 LPA',
    category: 'Engineering',
    description: 'Looking for a skilled React developer...',
    postedBy: 'employer1',
    applicants: 45
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'InfoSys',
    location: 'Hyderabad',
    experience: '3-6 years',
    salary: '12-20 LPA',
    category: 'Engineering',
    description: 'MERN stack developer needed...',
    postedBy: 'employer1',
    applicants: 67
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Wipro',
    location: 'Pune',
    experience: '1-3 years',
    salary: '6-12 LPA',
    category: 'Data Science',
    description: 'Python and ML expertise required...',
    postedBy: 'employer2',
    applicants: 23
  }
];

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'candidate', status: 'active' },
  { id: 2, name: 'Tech Corp', email: 'hr@techcorp.com', role: 'employer', status: 'active' },
  { id: 3, name: 'Admin User', email: 'admin@jobportal.com', role: 'admin', status: 'active' }
];

// Components
const Header = ({ currentView, setCurrentView }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-600">JobPortal</h1>
            {user && (
              <nav className="hidden md:flex space-x-6">
                {user.role === 'candidate' && (
                  <>
                    <button
                      onClick={() => setCurrentView('jobs')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'jobs' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      Browse Jobs
                    </button>
                    <button
                      onClick={() => setCurrentView('applications')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'applications' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      My Applications
                    </button>
                  </>
                )}
                {user.role === 'employer' && (
                  <>
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => setCurrentView('post-job')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'post-job' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      Post Job
                    </button>
                  </>
                )}
                {user.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'admin' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    Admin Panel
                  </button>
                )}
              </nav>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const { login } = useAuth();
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: Date.now(),
      name: isRegister ? name : email.split('@')[0],
      email,
      role
    };
    login(userData);
  };

  // Demo credentials
  const demoLogin = (demoRole) => {
    const demoUsers = {
      candidate: { name: 'John Doe', email: 'john@example.com', role: 'candidate' },
      employer: { name: 'HR Manager', email: 'hr@techcorp.com', role: 'employer' },
      admin: { name: 'Admin', email: 'admin@jobportal.com', role: 'admin' }
    };
    login(demoUsers[demoRole]);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isRegister ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className={`rounded-md shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
            {isRegister && (
              <div className="mb-4">
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            
            <div className="mb-6">
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                I am a
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <option value="candidate">Job Seeker</option>
                <option value="employer">Employer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isRegister ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
        
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-sm p-4`}>
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Demo Login:</h3>
          <div className="space-y-2">
            <button
              onClick={() => demoLogin('candidate')}
              className="w-full text-left px-3 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
            >
              👤 Login as Candidate
            </button>
            <button
              onClick={() => demoLogin('employer')}
              className="w-full text-left px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
            >
              🏢 Login as Employer
            </button>
            <button
              onClick={() => demoLogin('admin')}
              className="w-full text-left px-3 py-2 text-sm bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors"
            >
              ⚙️ Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job, onApply, applied = false, onBookmark, bookmarked = false, showActions = true }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
            {job.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              {job.company}
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </span>
            <span className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              {job.experience}
            </span>
          </div>
        </div>
        {showActions && (
          <button
            onClick={() => onBookmark(job.id)}
            className={`p-2 rounded-md transition-colors ${
              bookmarked 
                ? 'text-yellow-500 hover:text-yellow-600' 
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <Star className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
          {job.salary}
        </span>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {job.category}
        </span>
      </div>
      
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
        {job.description}
      </p>
      
      {showActions && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {job.applicants} applicants
          </span>
          <button
            onClick={() => onApply(job.id)}
            disabled={applied}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              applied
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {applied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
      )}
    </div>
  );
};

const JobListing = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const { isDark } = useTheme();

  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !locationFilter || job.location === locationFilter;
      const matchesCategory = !categoryFilter || job.category === categoryFilter;
      
      return matchesSearch && matchesLocation && matchesCategory;
    });
    
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchTerm, locationFilter, categoryFilter, jobs]);

  const handleApply = (jobId) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
  };

  const handleBookmark = (jobId) => {
    setBookmarkedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const locations = [...new Set(jobs.map(job => job.location))];
  const categories = [...new Set(jobs.map(job => job.category))];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search jobs or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            </div>
            
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-gray-700 border-gray-600 tex

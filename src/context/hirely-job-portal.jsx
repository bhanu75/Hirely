import React, { useReducer, createContext, useContext } from 'react';

// 🔐 Auth Context Setup
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

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false
  });

  const login = (userData) => dispatch({ type: 'LOGIN', payload: userData });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

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
    description: 'Looking for a skilled React developer to join our dynamic team. Experience with modern JavaScript frameworks required.',
    postedBy: 'employer1',
    applicants: 45,
    datePosted: '2024-01-15'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'InfoSys',
    location: 'Hyderabad',
    experience: '3-6 years',
    salary: '12-20 LPA',
    category: 'Engineering',
    description: 'MERN stack developer needed for enterprise-level applications. Strong problem-solving skills essential.',
    postedBy: 'employer1',
    applicants: 67,
    datePosted: '2024-01-10'
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Wipro',
    location: 'Pune',
    experience: '1-3 years',
    salary: '6-12 LPA',
    category: 'Data Science',
    description: 'Python and ML expertise required for analyzing large datasets and building predictive models.',
    postedBy: 'employer2',
    applicants: 23,
    datePosted: '2024-01-12'
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'DesignCo',
    location: 'Mumbai',
    experience: '2-4 years',
    salary: '7-12 LPA',
    category: 'Design',
    description: 'Creative designer needed for mobile and web applications. Figma and Adobe Creative Suite experience required.',
    postedBy: 'employer2',
    applicants: 34,
    datePosted: '2024-01-08'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Delhi',
    experience: '3-7 years',
    salary: '15-25 LPA',
    category: 'Engineering',
    description: 'Experienced DevOps engineer for AWS/Azure cloud infrastructure management and CI/CD pipelines.',
    postedBy: 'employer1',
    applicants: 29,
    datePosted: '2024-01-14'
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Bangalore',
    experience: '4-8 years',
    salary: '18-30 LPA',
    category: 'Management',
    description: 'Strategic product manager to drive product vision and work with cross-functional teams.',
    postedBy: 'employer2',
    applicants: 41,
    datePosted: '2024-01-11'
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
            <h1 className="text-2xl font-bold text-blue-600">Hirely</h1>
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
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            Job Opportunities
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {filteredJobs.length} jobs
            {searchTerm && ` for "${searchTerm}"`}
            {locationFilter && ` in ${locationFilter}`}
            {categoryFilter && ` in ${categoryFilter}`}
          </p>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              applied={appliedJobs.has(job.id)}
              onBookmark={handleBookmark}
              bookmarked={bookmarkedJobs.has(job.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No jobs found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md transition-colors ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Applications = () => {
  const { isDark } = useTheme();
  const [applications] = useState([
    { id: 1, jobTitle: 'Frontend Developer', company: 'TechCorp India', status: 'Under Review', appliedDate: '2024-01-15' },
    { id: 2, jobTitle: 'UI/UX Designer', company: 'DesignCo', status: 'Interview Scheduled', appliedDate: '2024-01-10' },
    { id: 3, jobTitle: 'Data Scientist', company: 'Wipro', status: 'Rejected', appliedDate: '2024-01-08' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
          My Applications
        </h2>
        
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {app.jobTitle}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    {app.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    Applied on {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {applications.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No applications yet</h3>
            <p>Start applying to jobs to see your applications here</p>
          </div>
        )}
      </div>
    </div>
  );
};

const EmployerDashboard = () => {
  const { isDark } = useTheme();
  const [postedJobs] = useState(mockJobs.slice(0, 3));

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
          Employer Dashboard
        </h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Jobs Posted</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>12</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Applications</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>247</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Active Jobs</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>8</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
        
        {/* Recent Jobs */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Recent Job Postings
          </h3>
          <div className="space-y-4">
            {postedJobs.map(job => (
              <div key={job.id} className={`flex justify-between items-center p-4 border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div>
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{job.title}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {job.applicants} applications • Posted {job.datePosted}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PostJob = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    experience: '',
    salary: '',
    category: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle job posting logic here
    alert('Job posted successfully!');
    setFormData({
      title: '',
      company: '',
      location: '',
      experience: '',
      salary: '',
      category: '',
      description: ''
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
          Post a New Job
        </h2>
        
        <form onSubmit={handleSubmit} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Job Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Company
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Experience Required
              </label>
              <input
                type="text"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 2-5 years"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Salary Range
              </label>
              <input
                type="text"
                name="salary"
                required
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 8-15 LPA"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Data Science">Data Science</option>
                <option value="Management">Management</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Job Description
            </label>
            <textarea
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder="Describe the job requirements, responsibilities, and qualifications..."
            />
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const { isDark } = useTheme();
  const [users] = useState(mockUsers);
  const [jobs] = useState(mockJobs);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
          Admin Panel
        </h2>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Users</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{users.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Jobs</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{jobs.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Employers</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {users.filter(u => u.role === 'employer').length}
                </p>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Candidates</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {users.filter(u => u.role === 'candidate').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
        
        {/* Users Table */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden mb-8`}>
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>User Management</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    User
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Role
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-right text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200 dark:divide-gray-700`}>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'employer' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AppContent = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('jobs');

  const renderContent = () => {
    if (!isAuthenticated) {
      return <LoginForm />;
    }

    if (user.role === 'candidate') {
      switch (currentView) {
        case 'applications':
          return <Applications />;
        default:
          return <JobListing />;
      }
    }

    if (user.role === 'employer') {
      switch (currentView) {
        case 'post-job':
          return <PostJob />;
        case 'dashboard':
          return <EmployerDashboard />;
        default:
          return <EmployerDashboard />;
      }
    }

    if (user.role === 'admin') {
      return <AdminPanel />;
    }

    return <JobListing />;
  };

  return (
    <div className="min-h-screen">
      {isAuthenticated && (
        <Header currentView={currentView} setCurrentView={setCurrentView} />
      )}
      {renderContent()}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

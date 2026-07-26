import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/Home';
import { Agenda } from './pages/Agenda';
import { Speakers } from './pages/Speakers';
import { Sponsors } from './pages/Sponsors';
import { News } from './pages/News';
import { Registration } from './pages/Registration';
import { CallForPapers } from './pages/CallForPapers';

import { AdminLogin } from './pages/admin/Login';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AgendaAdmin } from './pages/admin/AgendaAdmin';
import { SpeakersAdmin } from './pages/admin/SpeakersAdmin';
import { SponsorsAdmin } from './pages/admin/SponsorsAdmin';
import { NewsAdmin } from './pages/admin/NewsAdmin';
import { SubmissionsAdmin } from './pages/admin/SubmissionsAdmin';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/agenda" element={<PublicLayout><Agenda /></PublicLayout>} />
          <Route path="/speakers" element={<PublicLayout><Speakers /></PublicLayout>} />
          <Route path="/sponsors" element={<PublicLayout><Sponsors /></PublicLayout>} />
          <Route path="/noticias" element={<PublicLayout><News /></PublicLayout>} />
          <Route path="/inscripcion" element={<PublicLayout><Registration /></PublicLayout>} />
          <Route path="/convocatoria" element={<PublicLayout><CallForPapers /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AgendaAdmin />} />
            <Route path="agenda" element={<AgendaAdmin />} />
            <Route path="speakers" element={<SpeakersAdmin />} />
            <Route path="sponsors" element={<SponsorsAdmin />} />
            <Route path="news" element={<NewsAdmin />} />
            <Route path="submissions" element={<SubmissionsAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

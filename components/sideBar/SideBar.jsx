'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
    Menu,
    ChevronLeft,
    ChevronRight,
    BarChart2,
    Car,
    Bike,
    Users,
    Wallet,
    Route,
    LogOut,
    Shield
} from 'lucide-react';
import { useAuth } from '@hooks/useAuth';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  useAuth();
  const pathname = usePathname();

  const [sidebarClosed, setSidebarClosed] = useState(false);
  const [user, setUser] = useState(null);
  const [reportsExpanded, setReportsExpanded] = useState(
    pathname.includes('/dashboard/reactions') ||
    pathname.includes('/dashboard/transactions') ||
    pathname.includes('/dashboard/events')
  );

  useEffect(() => {
    if (sidebarClosed) {
      setReportsExpanded(false);
    } else {
      setReportsExpanded(
        pathname.includes('/dashboard/reactions') ||
        pathname.includes('/dashboard/transactions') ||
        pathname.includes('/dashboard/events')
      );
    }
  }, [sidebarClosed, pathname]);

  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };

  const toggleReports = () => {
    setReportsExpanded(!reportsExpanded);
  };
  const auth = useAuth();
  const getUser = async () => {
    const accounts = await auth.accounts;
    console.log(accounts)
    if (accounts.length != 0) {
      const { data: user } = await auth.getUser(accounts[0]);
      setUser(user);
      console.log('xxxxxxxx', user);
    }
  };
  if (user === null) {
    getUser();
  }
  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        setSidebarClosed(window.innerWidth >= 1024 ? false : true);
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (sidebarClosed) {
      setReportsExpanded(false);
    }
  }, [sidebarClosed]);
  const router = useRouter();

  return (
    <>
      <nav className={`sidebar ${sidebarClosed ? 'close' : ''}`}>
        <header>
          <div className="image-text">
            {sidebarClosed ? null : (
              <span className="image">
                <Shield className="bx bx-home-alt icon" />
              </span>
            )}
            <div className="text logo-text">
              <span>Admin Dashboard</span>
            </div>
          </div>
          <div className="toggle-container">
            {sidebarClosed ? <Menu onClick={toggleSidebar} className={'toggle'}/> : <ChevronLeft onClick={toggleSidebar} className={'toggle'}/>}
          </div>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li
                className={`menu-link ${pathname === '/dashboard' ? 'active' : ''
                  }`}
              >
                <BarChart2 className="bx bx-home-alt icon" />
                <span className="text nav-text">
                  <Link href="/dashboard" className="text nav-text">
                    Dashboard
                  </Link>
                </span>
              </li>
              <li className="menu-link">
                <Users className="bx bx-home-alt icon" />
                <span className="text nav-text reports" onClick={toggleReports}>
                  Drivers
                </span>
              </li>
              {reportsExpanded && (
                <ul className="reports-categories">
                  <li
                    className={`reports-categories__link ${pathname === '/dashboard/reactions' ? 'active' : ''
                      }`}
                  >
                    <Car className="bx bx-home-alt icon" />
                    <Link href="/dashboard/drivers/cars" className="text nav-text">
                      Carros
                    </Link>
                  </li>

                  <li
                    className={`reports-categories__link ${pathname === '/dashboard/transactions' ? 'active' : ''
                      }`}
                  >
                    <Link
                      href="/dashboard/transactions"
                      className="text nav-text"
                    >
                      <Bike className="bx bx-home-alt icon" />
                      Motos
                    </Link>
                  </li>
                </ul>
              )}
              <li
                className={`nav-link ${pathname === '/dashboard/complains' ? 'active' : ''
                  }`}
              >
                <Users className="bx bx-bar-chart-alt-2 icon" />
                <span className="text nav-text">
                  <Link href="/dashboard/drivers" className="text nav-text">
                    Users
                  </Link>
                </span>
              </li>
              <li
                className={`nav-link ${pathname === '/dashboard/wallets' ? 'active' : ''
                  }`}
              >
                <Wallet className="bx bx-bar-chart-alt-2 icon" />

                <span className="text nav-text">
                  <Link href="/dashboard/wallets" className="text nav-text">
                    Ganancias
                  </Link>
                </span>

              </li>
              <li
                className={`nav-link ${pathname === '/dashboard/wallets' ? 'active' : ''
                  }`}
              >
                <Route className="bx bx-bar-chart-alt-2 icon" />

                <span className="text nav-text">
                  <Link href="/dashboard/wallets" className="text nav-text">
                    Carreras
                  </Link>
                </span>

              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li>
              <button
                onClick={() => auth.logout()}
                className="block px-4 py-2 text-sm text-gray-700 logout"
                id="logout"
              >
                <LogOut className="bx bx-log-out icon" />
                <span className="text nav-text">Logout</span>
              </button>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
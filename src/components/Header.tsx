
import { Link } from 'react-router-dom';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import {  CreditCard, Sun, Moon, Menu } from 'lucide-react';
import ProfileButton from '@/components/ui/ProfileButton';
import { useTheme } from "@/components/ThemeProvider"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useRecoilValue } from 'recoil';
import { userEmailState } from '@/store/selectors/userEmailSelector';

const routes = [
    {
        href: '/',
        label: 'HOME'
    },
    {
        href: '/signin',
        label: 'CUSTOMER LOGIN'
    },
    {
        href: '/bankerlogin',
        label: 'BANKER LOGIN'
    },
    {
        href: '/transactions',
        label: 'TRANSACTIONS'
    },
    {
        href: '/accounts',
        label: 'ACCOUNTS'
    }
];


const Header = () => {

    const { theme, setTheme } = useTheme();
    const userEmail = useRecoilValue(userEmailState);

  return (
    <header className='sm:flex sm:justify-between py-3 border-b'>
        <Container>
            <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>
                <div className='flex items-center'>
                    <Sheet>
                        <SheetTrigger>
                            <Menu className='h-6 md:hidden w-6'
                             />
                        </SheetTrigger>
                        <SheetContent side='left'
                        className='w-[300px] sm:w-[400px]'>
                            <nav className='flex flex-col gap-4'>
                                {routes.map((route, index) => (
                                    <Link key={index}
                                        to={route.href}
                                        className='block px-2 py-1 text-lg'
                                    >
                                        {route.label}
                                    </Link>   
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    { userEmail ? (<Link to='/' className='ml-4 lg:ml-0'>
                        <img src="logo.png" alt="" className='w-16 h-16' />
                    </Link>) : null}
                </div>
                <nav className='mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block'>
                    {routes.map((route,index) => (
                        <Button asChild variant={'ghost'} key={index}>
                            <Link key={index}
                            to={route.href}
                            className='text-sm font-medium transition-colors'
                            >
                                {route.label}
                            </Link>
                        </Button>       
                    ))}
                </nav>
                <div className='flex items-center'>
                    <Button 
                        variant="ghost"
                        size="icon"
                        className='mr-2'
                        aria-label='Add User'
                     >
                        <CreditCard className='h-6 w-6' />
                        <span className='sr-only'>
                            Add User
                        </span>
                    </Button>   
                    <Button
                        variant='ghost'
                        size='icon'
                        aria-label='Toggle Theme'
                        className='mr-6'
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        <Sun className='h-6 w-6 rotate-0 scale-100 transition-all 
                        dark:-rotate-90 dark:scale-0'/>
                        <Moon className='absolute h-6 w-6 rotate-90 scale-0 transition-all
                        dark:rotate-0 dark:scale-100'/>
                        <span className='sr-only'>
                            Toggle Theme
                        </span>
                    </Button>

                    { userEmail ? (
                        <ProfileButton />
                ) : (
                   <div className='flex'>
                    <Link to='/signup'>
                     <Button variant='default' size='sm' className='ml-2'>
                        Sign Up
                    </Button>
                    </Link>

                    <Link to='/signin'>
                     <Button variant='default' size='sm' className='ml-2'>
                        Sign In
                    </Button>
                    </Link>
                   </div>
                )}
                    
                </div>
            </div>
        </Container>
    </header>    
  );
};

export default Header;
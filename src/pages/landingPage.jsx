import React from 'react';
import medifyIcon from '../assets/icon.svg';
import heroIcon from '../assets/hero.svg';
import qna from '../assets/qna.svg';
import Search from '../components/Search';
import phoneIcon from '../assets/phone.svg';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default function LandingPage() {
    function handleSearch(data) {
        console.log('Search submitted', data);
    }

    return (
        <div
            style={{
                fontFamily: 'Poppins, sans-serif',
                backgroundColor: '#FAFBFE',
            }}
        >
            {/* Top Banner */}
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor: '#2AA8FF',
                    color: 'white',
                    padding: '10px 0',
                    fontSize: '14px',
                }}
            >
                The health and well-being of our patients and their health care team will always be our
                priority, so we follow the best practices for cleanliness.
            </div>

            {/* Header */}
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 135px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
            >
                <div>
                    <img src={medifyIcon} alt="Medify icon" style={{ height: '40px' }} />
                </div>
                <nav style={{ display: 'flex', gap: '30px' }}>
                    <a href="#" style={{ textDecoration: 'none', color: '#102851', fontWeight: '500' }}>
                        Find Doctors
                    </a>
                    <a href="#" style={{ textDecoration: 'none', color: '#102851', fontWeight: '500' }}>
                        Hospitals
                    </a>
                    <a href="#" style={{ textDecoration: 'none', color: '#102851', fontWeight: '500' }}>
                        Medicines
                    </a>
                    <a href="#" style={{ textDecoration: 'none', color: '#102851', fontWeight: '500' }}>
                        My Bookings
                    </a>
                </nav>
            </header>

            {/* Hero Section */}
            <section
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    backgroundColor: '#FAFBFE',
                    padding: '10px 15px 10px',
                }}
            >
                {/* Left Content */}
                <div style={{ maxWidth: '563px' }}>
                    <h1
                        style={{
                            fontSize: '31px',
                            fontWeight: '500',
                            lineHeight: '68px',
                            letterSpacing: '2%',
                            color: '#102851',
                        }}
                    >
                        Skip the travel! Find Online
                        <br />
                        <span
                            style={{
                                fontSize: '56px',
                                fontWeight: '700',
                                lineHeight: '68px',
                                color: '#102851',
                            }}
                        >
                            Medical <span
                                style={{
                                    fontSize: '56px',
                                    fontWeight: '700',
                                    lineHeight: '68px',
                                    color: '#07aff1ff',
                                }}
                            >Centers</span>
                        </span>
                    </h1>
                    <p
                        style={{
                            marginTop: '10px',
                            fontSize: '20px',
                            fontWeight: '400',
                            lineHeight: '32px',
                            letterSpacing: '2%',
                            color: '#5C6169',
                        }}
                    >
                        Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
                    </p>
                    <button
                        type="submit"
                        style={{
                            width: '231px',
                            height: '50px',
                            borderRadius: '8px',
                            padding: '12px 52px',
                            background: '#2AA8FF',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >Find Centers</button>
                </div>

                {/* Right Hero Image */}
                <div>
                    <img
                        src={heroIcon}
                        alt="Hero"
                        style={{
                            width: '643px',
                            height: '735px',
                            objectFit: 'contain',
                        }}
                    />
                </div>

                {/* Overlapping Search Component */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-55px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                    }}
                >
                    <Search onSearch={handleSearch} />
                </div>
            </section>

            {/* Swiper Section (FreeMode + Pagination) */}
            <section
                style={{
                    marginTop: '90px',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <div style={{ width: '85%', margin: '0 auto' }}>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{ clickable: true }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {['Cardiology', 'Dentistry', 'Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology', 'Ophthalmology'].map(
                            (item, i) => (
                                <SwiperSlide
                                    key={i}
                                    style={{
                                        background: '#2AA8FF',
                                        color: 'white',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '12px',
                                        height: '180px',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 12px rgba(16, 40, 81, 0.15)',
                                    }}
                                >
                                    {item}
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                </div>
            </section>
            <section>
                <img src={qna} alt="Q&A" style={{ width: '100%', height: '600px', objectFit: 'cover', marginTop: '50px' }} />
            </section>
            <section>
                <img src={phoneIcon} alt="Phone" style={{ width: '100%', height: '90%', objectFit: 'cover', marginTop: '50px' }} />
            </section>
            
        </div>
    );
}

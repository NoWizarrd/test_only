import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'swiper/scss';
import styles from './HistoricalDatesMobile.module.scss';
import { timePeriods } from '../../data/timePeriods';
import 'swiper/scss/navigation';
import SwiperComponent from '../Swiper/Swiper';
import TimePeriodPagination from '../TimePeriodPagination/TimePeriodPagination';

gsap.registerPlugin(useGSAP);

export default function HistoricalDatesMobile() {

  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const firstYearRef = useRef<HTMLParagraphElement>(null);
  const secondYearRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    if (firstYearRef.current && secondYearRef.current) {
        gsap.to(firstYearRef.current, {
          textContent: timePeriods[activeIndex].year1,
          duration: 1,
          snap: { textContent: 1 },
        });
  
        gsap.to(secondYearRef.current, {
          textContent: timePeriods[activeIndex].year2,
          duration: 1,
          snap: { textContent: 1 },
        });
      }

    gsap.fromTo(`.${styles.Title}`, {
      opacity: 0,
      ease: 'power1',
    },
    {
      opacity: 1,
      delay: 1,
      ease: 'power1',
    });
  }, [activeIndex]);


  const handleSlideChange = (index: number) => {
    setActiveIndex((prev) => index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <div className={styles.historicalDates} ref={container}>
      <h2 className={styles.h2}>Исторические даты</h2>
      <div className={styles.yearTitle}>
        <p ref={firstYearRef} style={{ color: '#5d5fef' }}></p>
        <p ref={secondYearRef} style={{ color: '#ef5da8' }}></p>
      </div>
      <div className={styles.controls}>
        <div className={styles.Title}>
          <b>{timePeriods[activeIndex].title}</b>
        </div>
        <SwiperComponent activeIndex={activeIndex} />
      </div>
      <div className={styles.buttons}>
        <p style={{ marginBottom: 5 }}>{`0${activeIndex + 1}/0${timePeriods.length}`}</p>
        <button onClick={handlePrev} disabled={activeIndex === 0}>{'<'}</button>
        <button onClick={handleNext} disabled={activeIndex === timePeriods.length - 1}>{'>'}</button>
      </div>
      <TimePeriodPagination activeIndex={activeIndex} onSlideChange={handleSlideChange} />
    </div>
  );
}
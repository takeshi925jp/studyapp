import Header from '../modules/Header'
import Footer from '../modules/Footer'
import Title from '../modules/Title'

export const StudySchedule = () => {

  const info = { title: '学習予定一覧', return_link: ''}
  return (
    <>
      <Header />
      <Title {...info}/>
      <Footer />
    </>
  );
};
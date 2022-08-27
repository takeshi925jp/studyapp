import Header from '../modules/Header'
import Footer from '../modules/Footer'
import Title from '../modules/Title'
import IconMenu from '../modules/IconMenu'

export const StudySchedule = () => {

  const info = { title: '学習予定一覧', returnFlg: false}
  return (
    <>
      <Header />
      <Title {...info}/>
      <IconMenu />
      <Footer />
    </>
  );
};
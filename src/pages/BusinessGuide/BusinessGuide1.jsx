import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from './BusinessGuide.module.scss';
import Header from "../../components/Header/Header";
import MenuBar from "../../components/MenuBar/MenuBar";
import Footer from "../../components/Footer/Footer";
import Bener from "../../components/Bener/Bener";
import FixIcon from "../../components/FixIcon/FixIcon";
import page1 from "../../assets/BusinessGuide/BusinessGuide1/page1.jpg";
import tableImage from "../../assets/BusinessGuide/BusinessGuide1/tableImage.jpg";



const projectData = [
  {
    label: "현장명",

    value: "서산 이안 스카이원",
  },

  {
    label: "사업명",

    value: "이안 스카이원 서산 장기일반민간임대주택",
  },

  {
    label: "대지위치",

    value: "충청남도 서산시 동문동 280-2",
  },

  {
    label: "규모",

    value:
      "지하 2층~지상 최고 38층, 총 3개동 / 공동주택 372세대 / 주거형 오피스텔 32실",
  },

  {
    label: "주택형",

    value:
      "공동주택 전용 84.9㎡ 84A·84B / 주거형 오피스텔 전용 84.9㎡ 84OA",
  },

  {
    label: "시행",

    value: "㈜랜드러버",
  },

  {
    label: "시공",

    value: "대우산업개발㈜",
  },

  {
    label: "신탁",

    value: "㈜무궁화신탁",
  },
];
const BusinessGuide1 = () => {
  const menuContents = [
    { title: "사업안내", url: "/BusinessGuide/intro" },
    { title: "분양일정", url: "/BusinessGuide/plan" },
  ];

  const [isScroll, setIsScroll] = useState(false);
  const { pathname } = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
<Header isChanged={isScroll} />
<FixIcon />

<Bener title="사업개요" />

<MenuBar contents={menuContents} />
<div className={styles.textBox}>
  <div>서산의 중심에서 하늘을 소유하다</div>
  <div>서산 이안 스카이원, 최고 38층 프리미엄 랜드마크</div>
</div>

<img
  className={styles.img3}
  src={page1}
  alt="서산 이안 스카이원 동문동 사업개요와 단지 전경"
/>

<div className={styles.tableContainer}>
  {!isMobile && (
    <img
      className={styles.tableImg}
      src={tableImage}
      alt="이안 스카이원 서산 사업규모와 주택형 안내표"
    />
				)}
				<table className={styles.projectTable}>
					<tbody>
						{projectData.map((item, index) => (
							<tr key={index}>
								<td className={styles.label}>{item.label}</td>
								<td className={styles.contents}>{item.value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			 <div className={styles.commonBox}>
				<div className={styles.notice}>
					※ 본 홈페이지에 표기된 내용은 하기의 내용을 근거로 한 내용이며, 추후 계획의 변동 등은 당사와 무관합니다.
				</div>
				
			</div> 


			<Footer />
		</div>
	)
}

export default BusinessGuide1;

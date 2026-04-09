import { styled } from 'styled-components'
import { FaSignInAlt, FaRegUser, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import { useAuthStore } from '../../store/authStore';
import Dropdown from './Dropdown';
import ThemeSwitcher from '../header/ThemeSwitcher';

const Header = () => {
  const { category } = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();

  return (
    <HeaderStyle>
      <h1><Link to="/">book store</Link></h1>
      <nav className='category'>
        <ul>
          {
            category.map((item) => (
              <li key={item.id}>
                <Link to={item.id === null ? '/books' : `/books?category_id=${item.id}`}>
                  {item.category_name}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <nav className='auth'>
        <Dropdown toggleButton={<FaUserCircle />} >
          <>
            {
              isLoggedIn && (
                <ul>
                  <li><Link to='/cart'>장바구니</Link></li>
                  <li><Link to='/orderlist'>주문목록</Link></li>
                  <li><button onClick={storeLogout}>로그아웃</button></li>
                </ul>
              )
            }
            {
              !isLoggedIn && (
                <ul>
                  <li>
                    <a href="/login">
                      <FaSignInAlt />로그인
                    </a>
                  </li>
                  <li>
                    <a href="/join">
                      <FaRegUser />회원가입
                    </a>
                  </li>
                </ul>
              )
            }
            <ThemeSwitcher />
          </>
        </Dropdown>


      </nav>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  h1 a{
    text-decoration: none;
    color: ${({ theme }) => theme.color.text};
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      list-style: none;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      list-style: none;
      width: 100px;

      li {
        a, button {
          line-height: 1;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: none;
          border: 0;
          cursor: pointer;
        }
      }
      
    }
  }
`;

export default Header
import React from 'react';
import './landingpage.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

export default function LandingPage() {
  return (
    <div className="landingpage-container">
      <main className="lp-main">
        <div className="lp-left">
          <h1>RABBIT CAKE.</h1>
          <p>Chúng tôi mang đến cho bạn những chiếc bánh <b>xinh đẹp</b> với hương vị tuyệt vời.</p>
          <Link to="/home" className="lp-button">Mua ngay</Link>
        </div>
        <div className="lp-right">
          <div className="lp-cake-img">
            <img src={assets.cake_1} alt="Cake" />
            {/* Quả trang trí */}
            {/* <img className="lp-fruit lp-fruit-1" src={assets.tho_main} alt="Raspberry" />
            <img className="lp-fruit lp-fruit-2" src={assets.strawberry} alt="Strawberry" />
            <img className="lp-fruit lp-fruit-3" src={assets.blueberry} alt="Blueberry" /> */}
          </div>
        </div>
      </main>
      {/* Quote Section */}
      <section className="lp-quote-container">
        <svg className="lp-quote-oval" width="900" height="300" viewBox="0 0 900 300">
          <ellipse cx="450" cy="150" rx="430" ry="120" style={{fill:'none',stroke:'#e05a7a',strokeWidth:3}} transform="rotate(-10 450 150)" />
        </svg>
        <div className="lp-quote-content">
          <span className="lp-quote-icon">&#8220;</span>
          <div>
            <div className="lp-quote-title">Rabbit Cake</div>
            <div className="lp-quote-text">
              Tại sao lại là <b>Rabbit Cake?</b> Những chú thỏ dễ thương sẽ mang đến cho bạn <b>những chiếc bánh xinh xắn</b><br/>
              <b>Thỏ</b> là biểu tượng của sự <b>ngọt ngào</b> và <b>tươi vui</b>, giống như những chiếc bánh của chúng tôi.<br/>
            </div>
          </div>
        </div>
      </section>
      {/* Why I Bake Section */}
      <section className="lp-why-bake">
        <div className="lp-why-bake-container">
          <div className="lp-why-bake-left">
            <h2 className="lp-why-bake-title">Chúng tôi kinh doanh những chiếc bánh xinh</h2>
            <div className="lp-why-bake-content">
              <span className="lp-quote-decor lp-quote-decor-top">&#8220;</span>
              <div className="lp-why-bake-text">
                <p>Những chiếc bánh xinh xắn <b>được làm mới hàng ngày</b>.</p>
                <p>Những chiếc bánh <b>được làm thủ công</b> với tình yêu và sự tỉ mỉ từ đôi bàn tay của những người thợ làm bánh.</p>
                <p>Những chiếc bánh đặc biệt <b>cho những ngày đặc biệt của bạn</b>.</p>
                <p>Với mong muốn <b>đem tới niềm vui cho khách hàng</b> và những người thân của họ.</p>
                <p>Chúng tôi luôn luôn sẵn sàng phục vụ bạn!</p>
              </div>
              <span className="lp-quote-decor lp-quote-decor-bottom">&#8221;</span>
            </div>
          </div>
          <div className="lp-why-bake-right">
            <div className="lp-why-bake-img-bottom">
              <img src={assets.main_img } alt="Wedding cake cutting" />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="lp-features-section">
        <div className="lp-features-bg">
          <h2 className="lp-features-title">Chúng tôi mang đến</h2>
          <div className="lp-features-grid">
            <div className="lp-feature-item">
              <div className="lp-feature-icon"><img src={assets.clock} alt="" /></div>
              <div className="lp-feature-name">Thời gian</div>
              <div className="lp-feature-desc">Thời gian chuẩn bị trong ngày<br/>và có thể sản xuất khẩn cấp*</div>
            </div>
            <div className="lp-feature-item">
              <div className="lp-feature-icon"><img src={assets.quantity} alt="" /></div>
              <div className="lp-feature-name">Chất lượng</div>
              <div className="lp-feature-desc">Chúng tôi chỉ sử dụng<br/>những nguyên liệu tốt nhất</div>
            </div>
            <div className="lp-feature-item">
              <div className="lp-feature-icon"><img src={assets.size} alt="" /></div>
              <div className="lp-feature-name">Kích thước</div>
              <div className="lp-feature-desc">Chúng tôi làm bánh<br/>có trọng lượng từ 500g đến 18kg</div>
            </div>
            <div className="lp-feature-item">
              <div className="lp-feature-icon"><img src={assets.diversity} alt="" /></div>
              <div className="lp-feature-name">Đa dạng</div>
              <div className="lp-feature-desc">Lựa chọn nhân phong phú<br/>đáp ứng mọi sở thích</div>
            </div>
            <div className="lp-feature-item">
              <div className="lp-feature-icon"><img src={assets.design} alt="" /></div>
              <div className="lp-feature-name">Thiết kế</div>
              <div className="lp-feature-desc">Thiết kế độc đáo<br/>được thực hiện theo yêu cầu của bạn</div>
            </div>
            <div className="lp-feature-item">
              <div className="lp-feature-icon"><img src={assets.delivery} alt="" /></div>
              <div className="lp-feature-name">Giao hàng</div>
              <div className="lp-feature-desc">Thông qua các dịch vụ giao hàng<br/>theo mức giá</div>
            </div>
          </div>
          <div className="lp-features-note">*Bánh kem và bánh ngọt có thể sản xuất trong ngày đặt hàng</div>
        </div>
      </section>
      {/* Current Products Section */}
      <section className="lp-current-section">
        <div className="lp-current-header">
          <h2 className="lp-current-title">SẢN PHẨM CHO MÙA VỤ SẮP TỚI</h2>
          <p className="lp-current-subtitle">Dòng bánh trung thu cao cấp</p>
        </div>
        <div className="lp-current-grid">
          <div className="lp-current-item lp-current-item-1">
            <img src={assets.banhmuavu_5} alt="Carrot Cake" />
            {/* <div className="lp-current-overlay">
              <div className="lp-current-label">Bánh trung thu</div>
              <div className="lp-current-price">50.000₫</div>
              <button className="lp-current-btn">Xem thêm</button>
            </div> */}
          </div>
          <div className="lp-current-item">
            <img src={assets.banhmuavu_1} alt="Chocolate Bars" />
          </div>
          <div className="lp-current-item">
            <img src={assets.banhmuavu_2} alt="Caramel Jar" />
          </div>
          <div className="lp-current-item">
            <img src={assets.banhmuavu_3} alt="Cake Slices" />
          </div>
          <div className="lp-current-item">
            <img src={assets.banhmuavu_6} alt="Birthday Cake" />
          </div>
          <div className="lp-current-item">
            <img src={assets.banhmuavu_4} alt="Cupcakes" />
          </div>
        </div>
      </section>
      {/* Catalog Section */}
      <section className="lp-catalog-section">
        <div className="lp-catalog-header">
          <h2 className="lp-catalog-title">Sản phẩm</h2>
          <div className="lp-catalog-tabs">
            <button className="lp-catalog-tab lp-catalog-tab-active">Bánh kem</button>
            <button className="lp-catalog-tab">Bánh ngọt</button>
            <button className="lp-catalog-tab">Bánh khô</button>
          </div>
        </div>
        <div className="lp-catalog-content">
          <div className="lp-catalog-left">
            <div className="lp-catalog-card">
              <h3 className="lp-catalog-card-title">bánh Entremet</h3>
              <p className="lp-catalog-card-desc">dòng bánh lạnh cao cấp của Pháp</p>
              <div className="lp-catalog-card-filling">
                <p><strong>Nhân:</strong></p>
                <ul>
                  <li>Vani, Anh đào</li>
                  <li>Dâu tây</li>
                </ul>
              </div>
              <div className="lp-catalog-card-price">
                <div className="lp-catalog-price-main">665.000₫</div>
                <div className="lp-catalog-price-note">Lấy cảm hứng từ những đoá phong lan kiêu sa, Orchid Divine sẽ là một món quà đầy tinh tế để tặng mẹ, tặng bà, tặng vợ hay chị em – những người phụ nữ ta yêu thương.</div>
                <div className="lp-catalog-price-small">Với kem mousse vani Madagascar làm chủ đạo, kèm theo mứt anh đào và dâu tây nấu tay, thêm lớp bạt bánh vỏ chanh xanh sẽ tạo nên một hương vị vô cùng ngọt ngào, tan chảy dành cho phái nữ.</div>
                <button className="lp-catalog-order-btn">Đặt hàng</button>
              </div>
            </div>
          </div>
          <div className="lp-catalog-right">
            <div className="lp-catalog-grid">
              <div className="lp-catalog-img">
                <img src={assets.cake_1} alt="Cake Slice 1" />
                <img src={assets.cake_1_1} alt="" className='hoverimg' />
              </div>
              <div className="lp-catalog-img">
                <img src={assets.cake_7} alt="Cake Slice 2" />
                <img src={assets.cake_7_1} alt="" className='hoverimg' />
              </div>
              <div className="lp-catalog-img">
                <img src={assets.cake_3} alt="Cake Slice 3" />
                <img src={assets.cake_3_1} alt="" className='hoverimg' />
              </div>
              <div className="lp-catalog-img">
                <img src={assets.cake_6} alt="Cake Slice 4" />
                <img src={assets.cake_6_1} alt="" className='hoverimg' />
              </div>
              <div className="lp-catalog-img">
                <img src={assets.cake_2_1} alt="Cake Slice 5" />
                <img src={assets.cake_7_2} alt="" className='hoverimg'/>
              </div>
            </div>
          </div>
        </div>
        <div className="lp-catalog-footer">
          <Link to="/home" className="lp-catalog-more-btn">Xem thêm</Link>
        </div>
      </section>
      {/* Contact Form Section */}
      <section className="lp-form-section">
        <div className="lp-form-container">
          <div className="lp-form-header">
            <h2 className="lp-form-title">KHÔNG THỂ QUYẾT ĐỊNH?</h2>
            <p className="lp-form-subtitle">Tôi có thể đề xuất cho bạn một số tùy chọn món tráng miệng, cũng như giúp bạn lựa chọn.</p>
          </div>
          <form className="lp-form">
            <div className="lp-form-section-item">
              <div className="lp-form-section-header">
                <span className="lp-form-icon"></span>
                <h3>Kể cho tôi biết sự kiện nào cần bánh tráng miệng</h3>
              </div>
              <textarea 
                className="lp-form-textarea" 
                placeholder="Xin chào! Tôi muốn đặt một chiếc bánh......"
                rows="6"
              ></textarea>
            </div>
            <div className="lp-form-section-item">
              <div className="lp-form-section-header">
                <span className="lp-form-icon">🎂</span>
                <h3>Các yêu cầu của bạn</h3>
              </div>
              <textarea 
                className="lp-form-textarea" 
                placeholder="Mô tả các yêu cầu của bạn về thiết kế, hương vị, kích thước..."
                rows="4"
              ></textarea>
            </div>
            <div className="lp-form-section-item">
              <div className="lp-form-section-header">
                <span className="lp-form-icon">🎂</span>
                <h3>Các loại bánh hoặc món tráng miệng bạn thích?</h3>
              </div>
              <div className="lp-form-inputs">
                <input 
                  type="text" 
                  className="lp-form-input" 
                  placeholder="Banh kem, bánh ngọt, bánh mì, bánh quy..."
                />
                <input 
                  type="tel" 
                  className="lp-form-input" 
                  placeholder="Số điện thoại của bạn"
                />
              </div>
            </div>
            <div className="lp-form-submit">
              <button type="submit" className="lp-form-btn">Gửi đi</button>
            </div>
          </form>
        </div>
        <div className="lp-form-decoration lp-form-raspberry-1">🍓</div>
        <div className="lp-form-decoration lp-form-raspberry-2">🍓</div>
      </section>
      {/* Gallery Section */}
      <section className="lp-gallery-section">
        <h2 className="lp-gallery-title">Thư viện bánh</h2>
        <div className="lp-gallery-container">
          <button className="lp-gallery-nav lp-gallery-nav-left">‹</button>
          <div className="lp-gallery-grid">
            <div className="lp-gallery-item">
              <img src={assets.cakegallery_1} alt="White Cake with Figs" />
            </div>
            <div className="lp-gallery-item">
              <img src={assets.cakegallery_2} alt="Pink Birthday Cake" />
            </div>
            <div className="lp-gallery-item">
              <img src={assets.cakegallery_3} alt="Chocolate Cake Pops" />
            </div>
            <div className="lp-gallery-item">
              <img src={assets.cakegallery_4} alt="Chocolate Truffles" />
            </div>
            <div className="lp-gallery-item">
              <img src={assets.cakegallery_5} alt="Chocolate Cake Slice" />
            </div>
            <div className="lp-gallery-item">
              <img src={assets.cakegallery_6} alt="Cupcakes with Lavender" />
            </div>
          </div>
          <button className="lp-gallery-nav lp-gallery-nav-right">›</button>
        </div>
      </section>
      {/* Footer
      <footer className="lp-footer">
        <div className="lp-footer-content">
          <div className="lp-footer-left">
            <h3>Навигация</h3>
            <ul className="lp-footer-nav">
              <li><a href="#catalog">Каталог</a></li>
              <li><a href="#current">Актуальные</a></li>
              <li><a href="#reviews">Отзывы</a></li>
              <li><a href="#gallery">Галерея</a></li>
            </ul>
          </div>
          <div className="lp-footer-center">
            <div className="lp-footer-logo">
              <span className="lp-footer-logo-icon">🎂</span>
              <span className="lp-footer-logo-text">Urban Cake</span>
            </div>
            <div className="lp-footer-contact">
              <div className="lp-footer-contact-item">
                <span>📞</span>
                <span>+375 25 753-92-83</span>
              </div>
              <div className="lp-footer-contact-item">
                <span>📍</span>
                <span>Минск</span>
              </div>
              <div className="lp-footer-contact-item">
                <span>📷</span>
                <span>urban_cake_</span>
              </div>
            </div>
          </div>
          <div className="lp-footer-right">
            <button className="lp-footer-scroll-top">▲</button>
            <span className="lp-footer-scroll-text">Наверх</span>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

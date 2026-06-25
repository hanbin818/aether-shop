export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <p className="footer-label">
          LUXURY SELECT SHOP
        </p>

        <h2>AETHER</h2>

        <p className="footer-text">
          Curated Luxury Since 2026
          <br />
          프리미엄 명품 셀렉트샵 AETHER
        </p>

        <div className="footer-menu">
          <a href="/">HOME</a>
          <a href="/products">SHOP</a>
          <a href="/men">MEN</a>
          <a href="/women">WOMEN</a>
          <a href="/order">ORDER</a>
          <a href="/mypage">MY PAGE</a>
        </div>

        <div className="footer-divider" />

        <div className="footer-brand">
          <div>
            <h3>AETHER</h3>
            <span>Luxury Select Shop</span>
          </div>

          <div className="footer-social">
            <a href="/products">NEW</a>
            <a href="/products">BEST</a>
            <a href="/products">COLLECTION</a>
          </div>
        </div>

        <div className="footer-divider" />

        <p className="copyright">
          © 2026 AETHER.
          <br />
          Curated Luxury Fashion Marketplace.
        </p>

      </div>

      <style>{`
        .footer{
          background:#0b0b0f;
          color:#fff;
          padding:90px 20px 48px;
          border-top:1px solid rgba(255,255,255,.08);
        }

        .footer-inner{
          max-width:1200px;
          margin:auto;
        }

        .footer-label{
          text-align:center;
          color:#d8c39f;
          letter-spacing:6px;
          font-size:12px;
          font-weight:900;
          margin-bottom:18px;
        }

        .footer h2{
          text-align:center;
          margin:0;
          font-size:58px;
          letter-spacing:14px;
          font-weight:950;
        }

        .footer-text{
          text-align:center;
          color:#b7b7b7;
          margin:22px auto 50px;
          line-height:1.9;
          font-size:16px;
        }

        .footer-menu{
          display:flex;
          justify-content:center;
          gap:34px;
          flex-wrap:wrap;
          margin-bottom:50px;
        }

        .footer-menu a{
          color:#fff;
          text-decoration:none;
          font-size:13px;
          font-weight:900;
          letter-spacing:2px;
          transition:.25s;
        }

        .footer-menu a:hover{
          color:#d8c39f;
        }

        .footer-divider{
          height:1px;
          background:rgba(255,255,255,.08);
          margin:36px 0;
        }

        .footer-brand{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:24px;
          flex-wrap:wrap;
        }

        .footer-brand h3{
          margin:0;
          font-size:26px;
          letter-spacing:6px;
          font-weight:950;
        }

        .footer-brand span{
          color:#888;
          display:block;
          margin-top:8px;
          font-size:14px;
        }

        .footer-social{
          display:flex;
          gap:16px;
          flex-wrap:wrap;
        }

        .footer-social a{
          color:#d8c39f;
          text-decoration:none;
          font-size:13px;
          font-weight:900;
          border:1px solid rgba(216,195,159,.35);
          padding:12px 20px;
          border-radius:999px;
          transition:.25s;
        }

        .footer-social a:hover{
          background:#d8c39f;
          color:#111;
        }

        .copyright{
          text-align:center;
          color:#666;
          margin-top:26px;
          line-height:1.9;
          font-size:12px;
          letter-spacing:1px;
        }

        @media(max-width:768px){

          .footer{
            padding:70px 18px 38px;
          }

          .footer h2{
            font-size:42px;
            letter-spacing:10px;
          }

          .footer-menu{
            gap:18px;
          }

          .footer-brand{
            flex-direction:column;
            text-align:center;
          }

          .footer-social{
            justify-content:center;
          }

        }
      `}</style>

    </footer>
  );
}
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang chủ - Bài tập Web</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .student-info {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .result-image img {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .nav-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .nav-link:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

    <header class="student-info">
        <h1>Thông tin sinh viên</h1>
        <p><strong>Họ và tên:</strong> Lê Thanh Bình</p>
        <p><strong>Mã sinh viên:</strong> [231A310054]</p>
    </header>

    <main>
        <section class="result-image">
            <h2>Kết quả bài tập 18 (Trắc nghiệm)</h2>
            <img src="img/ketqua_bt18.jpg" alt="Ảnh chụp kết quả Bài tập 18">
        </section>

        <section>
            <a href="baitap19.html" class="nav-link">Đi đến Bài tập 19 - Game Ghép Thẻ</a>
        </section>
    </main>

</body>
</html>
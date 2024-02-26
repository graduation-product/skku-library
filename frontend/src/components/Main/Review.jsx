function Review() {
  return (
    <div className="col-9 d-flex flex-column align-items-center justify-content-center">
      <div className="w-100 p-4 d-flex align-items-center border-bottom">
        <div style={{ flex: 7 }}>제목</div>
        <div className="d-flex justify-content-center" style={{ flex: 2 }}>
          작성자
        </div>
        <div className="d-flex justify-content-end" style={{ flex: 1 }}>
          조회수
        </div>
      </div>
    </div>
  );
}
export default Review;

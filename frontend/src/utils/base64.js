// 이미지를 base64로 인코딩
export function getBase64FromFile(file) {
  // Promise를 활용
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result); // 로딩이 됐다면 호출
    reader.onerror = (error) => reject(error);
  });
}

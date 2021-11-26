// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { Alert } from "antd";
// import { useHistory } from "react-router-dom";

// function Signup() {
//   // useHistory 훅을 이용하여 페이지 이동처리
//   const history = useHistory();

//   // 값을 담을 변수 설정
//   const [inputs, setInputs] = useState({
//     username: "",
//     password: "",
//     nickname: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formDisabled, setFormDisabled] = useState(true);

//   // Ajax(비동기 자바스크립트 형식)
//   const onSubmit = (e) => {
//     // e란 이벤트를 말함
//     e.preventDefault(); // 페이지의 이동을 막음

//     setLoading(true);
//     // 에러요청을 보내기전에 클리어시키기
//     setErrors({});

//     // Axios를 통해 입력받은 값을 백엔드로 보냄
//     Axios.post("http://localhost:8000/accounts/signup/", inputs)
//       .then((response) => {
//         // 회원가입이 성공했을 떄 로그인 페이지로 이동
//         history.push("/accounts/login");
//       })
//       .catch((error) => {
//         // 서버에서 에러가 발생했다면 에러 내용을 반환
//         if (error.response) {
//           setErrors({
//             username: (error.response.data.username || []).join(" "),
//             password: (error.response.data.password || []).join(" "),
//             nickname: (error.response.data.nickname || []).join(" "),
//           });
//         }
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     // input안에 값들의 길이가 0보다 크다면
//     const isEnabled = Object.values(inputs).every((s) => s.length > 0);
//     setFormDisabled(!isEnabled);
//   }, [inputs]);

//   // 입력받은 값에 대한것을 setInputs에 담아줌
//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setInputs((prev) => ({
//       ...prev, // 이전값을 참조하도록 설정
//       [name]: value, // 값을 평가
//     }));
//   };

//   return (
//     <div>
//       {/* onSubmit시 함수를 호출한다 */}
//       <form onSubmit={onSubmit}>
//         {/* onChange 값이 변경될때마다  */}
//         <div>
//           <input type="text" name="username" onChange={onChange} />
//           {errors.username && <Alert type="error" message={errors.username} />}
//         </div>
//         <div>
//           <input type="password" name="password" onChange={onChange} />
//           {errors.password && <Alert type="error" message={errors.password} />}
//         </div>
//         <div>
//           <input type="text" name="nickname" onChange={onChange} />
//           {errors.nickname && <Alert type="error" message={errors.nickname} />}
//         </div>
//         <input
//           type="submit"
//           value="회원가입"
//           disabled={loading || formDisabled}
//         />
//       </form>
//     </div>
//   );
// }

// export default Signup;

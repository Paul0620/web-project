export function parseErrorMessages(fieldsErrorMessages) {
  return Object.entries(fieldsErrorMessages).reduce(
    (acc, [fieldName, errors]) => {
      // 리스트로 넘어온 에러들을 문자열로 공백을 두어서 리턴
      acc[fieldName] = {
        validateStatus: "error",
        help: errors.join(" "),
      };
      return acc;
    },
    {}
  );
}

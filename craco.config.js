import million from "million/compiler"
export default {
  webpack: {
    plugins: { add: [million.webpack({ auto: true })] }
  }
};
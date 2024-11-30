import { useNavigate } from "react-router-dom";
import { useLoginCreate } from "../../service/mutation/useLoginCreate";
import { Button, Form, Input, message } from "antd";
import { loadState, saveState } from "../../config/storage";
import { useEffect} from "react";
import Imag from "../../assets/img/login-page_img.png";
import Logo from "../../assets/LOGO.svg";

interface LoginData {
  login: string;
  password: string;
}


export const Login: React.FC = () => {
  const { mutate } = useLoginCreate();
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginData>();

  const submit = (data: LoginData): void => {
    mutate(data, {
      onSuccess: (res) => {
        message.success("Muvaffaqiyatli tizimga kirdingiz");
        
        
        saveState("token", res.data);
        navigate("/app");
      },
      onError: () => {
        message.error("Login yoki parol noto'g'ri")
      },
    });
    form.resetFields();


  };

  useEffect(() => {
    const accesToken = loadState("token");

    if (accesToken) {
      navigate("/app");
    }
  }, [navigate]);

  return (
    <div style={{ display: "flex", gap: "100px"}}>
      <div>
        <img style={{height: "100vh"}} src={Imag} alt="imag" />
      </div>
      <div style={{paddingTop: "60px"}}>
        <a href="#">
          <img src={Logo} alt="logo" />
        </a>
        <div style={{width: "380px", marginTop:"200px"}}>
          <h2 style={{fontWeight: 500, fontSize: "32px", lineHeight: "150%", marginBottom: "32px"}}>Tizimga kirish</h2>
          <Form form={form} layout="vertical" name="login" onFinish={submit}>
            <Form.Item
              name="login"
              label={"Login"}
              rules={[
                { message: "Please input your login" },
              ]}
            >
              <Input className="login_input" placeholder="Loginni kiriting" size="large" />
            </Form.Item>
            <Form.Item
              label="Parol"
              name="password"
              rules={[
                {
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Parolni kiriting" />
            </Form.Item>
            <Button style={{ width: "100%" }} size="large" type="primary" htmlType="submit">
              Kirish
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

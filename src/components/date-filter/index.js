import { Button, DatePicker, Form, Select } from "antd";
import Input from "../input";
import dayjs from "dayjs";

export default function DateFilter(props) {
    const {
        additionalInputs,
        handleSubmit,
        form
    } = props;

    return (
        <div className="py-2">
            <Form form={form} name={`date-filter`} layout={`vertical`} onFinish={handleSubmit}>
                <div className="flex gap-x-4 gap-y-2 items-end">
                    {
                        additionalInputs.map((item) => item)
                    }

                    <Form.Item>
                        <Button className={`bg-primary`} type={`primary`} htmlType={`submit`}>Filter</Button>
                    </Form.Item>
                </div>
            </Form>
            <hr className="my-2" />
        </div>
    );
}

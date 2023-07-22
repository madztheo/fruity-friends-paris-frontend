import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { TopBar } from "@/components/top-bar/TopBar";
import styles from "@/styles/profile/Edit.module.scss";
import { getImageByIndex } from "@/utils";
import cn from "classnames";
import { useState } from "react";

export default function ProfileEdit() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    age: "",
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TopBar
          image={getImageByIndex(3)}
          className={styles.top}
          title="Edit my profile"
        />
        <div className={styles.form}>
          <Input
            containerClassName={styles.input__container}
            value={form.name}
            onChange={(val: string) => {
              setForm({ ...form, name: val });
            }}
            placeholder="Name"
          />
          <Input
            containerClassName={styles.input__container}
            value={form.age}
            onChange={(val: string) => {
              setForm({ ...form, age: val });
            }}
            placeholder="Age"
          />
          <Input
            containerClassName={styles.input__container}
            value={form.bio}
            textarea={true}
            onChange={(val: string) => {
              setForm({ ...form, name: val });
            }}
            placeholder="Bio"
          />
        </div>
        <Button className={styles.save__button} text="Save" theme="primary" />
      </div>
    </div>
  );
}

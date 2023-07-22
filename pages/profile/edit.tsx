import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { TopBar } from "@/components/top-bar/TopBar";
import styles from "@/styles/profile/Edit.module.scss";
import { getImageByIndex } from "@/utils";
import { clientSideRequest } from "@/utils/api";
import { useUser } from "@/utils/hook";
import cn from "classnames";
import { useEffect, useState } from "react";

export default function ProfileEdit() {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    age: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        bio: user.description,
        age: user.age?.toString(),
      });
    }
  }, [user]);

  const onSave = async () => {
    try {
      setLoading(true);
      const updatedUser = await clientSideRequest("/api/user/update", {
        id: user?._id,
        name: form.name,
        description: form.bio,
        age: Number(form.age),
      });
      console.log(updatedUser);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
              setForm({ ...form, bio: val });
            }}
            placeholder="Bio"
          />
        </div>
        <Button
          className={styles.save__button}
          text="Save"
          theme="primary"
          loading={loading}
          loadingText="Loading..."
          onClick={onSave}
        />
      </div>
    </div>
  );
}

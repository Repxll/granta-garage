import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Steps, BodyCard, ModificationCard } from "./onboarding";
import { bodies, modifications } from "@/lib/data";

const meta = { title: "Screens/Онбординг", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  name: "Шаг 1 — кузов картинкой",
  render: () => (
    <div>
      <Steps current={0} labels={["Кузов", "Мотор"]} />
      <div className="grid grid-cols-2 gap-3 pt-5">
        {bodies.map((b) => (
          <BodyCard key={b.code} code={b.code} name={b.name} years={b.years} note={b.note} href="#" />
        ))}
      </div>
    </div>
  ),
};

export const Modification: Story = {
  name: "Шаг 2 — мотор цифрой",
  render: () => (
    <div className="flex flex-col gap-3">
      <Steps current={1} labels={["Кузов", "Мотор"]} />
      {modifications.map((m, i) => (
        <ModificationCard key={m.id} valves={m.id === "8v" ? "8V" : "16V"} name={m.name} power={m.power} engine={m.engine} gearbox={m.gearbox} years={m.years} onClick={() => {}} busy={i === 1} />
      ))}
    </div>
  ),
};

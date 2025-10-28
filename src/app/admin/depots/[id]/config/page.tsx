// app/admin/depots/[id]/config/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Config, configZ } from "@/schemas/depot-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const emptyConfig: Config = {
  title: "New depot config",
  sections: [
    {
      key: "bitumen",
      label: "Bitumen",
      groups: [
        {
          key: "tanks",
          label: "Bitumen tank readings",
          items: [
            {
              key: "tank_1",
              label: "Tank #1",
              type: "number",
              unit: "t",
              precision: 2,
            },
          ],
        },
      ],
    },
  ],
};

type Selected =
  | { type: "section"; sIdx: number }
  | { type: "group"; sIdx: number; gIdx: number }
  | { type: "field"; sIdx: number; gIdx: number; fIdx: number }
  | null;

export default function DepotConfigEditorPage() {
  const params = useParams<{ id: string }>();
  const depotId = params.id;
  const [cfg, setCfg] = useState<Config>(emptyConfig);
  const [selected, setSelected] = useState<Selected>(null);
  const [saving, setSaving] = useState(false);
  const [issues, setIssues] = useState<string[]>([]);

  // --- util to update cfg immutably
  const updateCfg = (fn: (draft: Config) => void) => {
    const copy = structuredClone(cfg);
    fn(copy);
    setCfg(copy);
  };

  const validate = () => {
    const result = configZ.safeParse(cfg);
    const errs: string[] = [];
    if (!result.success) {
      errs.push(
        ...(Object.values(result.error.flatten().fieldErrors)
          .flat()
          .filter(Boolean) as string[])
      );
    }
    setIssues(errs);
    return errs.length === 0;
  };

  const addSection = () => {
    const n = cfg.sections.length + 1;
    updateCfg((draft) => {
      draft.sections.push({
        key: `section_${n}`,
        label: `Section ${n}`,
        groups: [],
      });
    });
  };

  const addGroup = (sIdx: number) => {
    updateCfg((draft) => {
      const n = draft.sections[sIdx].groups.length + 1;
      draft.sections[sIdx].groups.push({
        key: `group_${n}`,
        label: `Group ${n}`,
        items: [],
      });
    });
  };

  const addField = (sIdx: number, gIdx: number) => {
    updateCfg((draft) => {
      const n = draft.sections[sIdx].groups[gIdx].items.length + 1;
      draft.sections[sIdx].groups[gIdx].items.push({
        key: `field_${n}`,
        label: `Field ${n}`,
        type: "number",
        unit: "t",
        precision: 2,
      });
    });
  };

  const saveDraft = async () => {
    if (!validate()) return;
    setSaving(true);
    const res = await fetch(`/api/depots/${depotId}/configs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        json: cfg,
        effectiveFrom: new Date().toISOString(),
        createdById: "admin",
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert("Save failed: " + JSON.stringify(j?.error ?? j));
    } else {
      alert("Draft saved");
    }
  };

  const renderInspector = () => {
    if (!selected) {
      return (
        <div className="text-sm text-gray-500">
          Select a Section, Group, or Field to edit its properties.
        </div>
      );
    }

    // Narrow by discriminant
    switch (selected.type) {
      case "section": {
        const s = cfg.sections[selected.sIdx];

        const set = (key: "label" | "key", val: string) =>
          updateCfg((draft) => {
            draft.sections[selected.sIdx][key] = val;
          });

        return (
          <div className="space-y-3">
            <div className="font-semibold">Section properties</div>

            <div>
              <Label>Label</Label>
              <Input
                value={s.label}
                onChange={(e) => set("label", e.target.value)}
              />
            </div>

            <div>
              <Label>Key</Label>
              <Input
                value={s.key}
                onChange={(e) => set("key", e.target.value)}
              />
            </div>
          </div>
        );
      }

      case "group": {
        const s = cfg.sections[selected.sIdx];
        const g = s.groups[selected.gIdx];

        const set = (key: "label" | "key", val: string) =>
          updateCfg((draft) => {
            draft.sections[selected.sIdx].groups[selected.gIdx][key] = val;
          });

        return (
          <div className="space-y-3">
            <div className="font-semibold">Group properties</div>

            <div>
              <Label>Label</Label>
              <Input
                value={g.label}
                onChange={(e) => set("label", e.target.value)}
              />
            </div>

            <div>
              <Label>Key</Label>
              <Input
                value={g.key}
                onChange={(e) => set("key", e.target.value)}
              />
            </div>
          </div>
        );
      }

      case "field": {
        const s = cfg.sections[selected.sIdx];
        const g = s.groups[selected.gIdx];
        const f = g.items[selected.fIdx];

        const set = <K extends keyof typeof f>(path: K, val: (typeof f)[K]) => {
          updateCfg((draft) => {
            draft.sections[selected.sIdx].groups[selected.gIdx].items[
              selected.fIdx
            ][path] = val;
          });
        };

        return (
          <div className="space-y-3">
            <div className="font-semibold">Field properties</div>

            <div>
              <Label>Label</Label>
              <Input
                value={f.label}
                onChange={(e) => set("label", e.target.value)}
              />
            </div>

            <div>
              <Label>Key</Label>
              <Input
                value={f.key}
                onChange={(e) => set("key", e.target.value)}
              />
            </div>

            <Separator />

            <div>
              <Label>Type</Label>
              <Select
                value={f.type}
                onValueChange={(val) => set("type", val as typeof f.type)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">number</SelectItem>
                  <SelectItem value="integer">integer</SelectItem>
                  <SelectItem value="boolean">boolean</SelectItem>
                  <SelectItem value="text">text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Unit</Label>
              <Input
                value={f.unit ?? ""}
                onChange={(e) => set("unit", e.target.value as typeof f.unit)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label>Min</Label>
                <Input
                  type="number"
                  value={f.min ?? ""}
                  onChange={(e) =>
                    set(
                      "min",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
              <div>
                <Label>Max</Label>
                <Input
                  type="number"
                  value={f.max ?? ""}
                  onChange={(e) =>
                    set(
                      "max",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
              <div>
                <Label>Step</Label>
                <Input
                  type="number"
                  value={f.step ?? ""}
                  onChange={(e) =>
                    set(
                      "step",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Precision</Label>
                <Input
                  type="number"
                  value={f.precision ?? ""}
                  onChange={(e) => {
                    const val = e.target.value
                      ? Number(e.target.value)
                      : undefined;
                    if (val === undefined || [0, 1, 2, 3].includes(val)) {
                      set("precision", val as typeof f.precision);
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <Checkbox
                  checked={!!f.required}
                  onCheckedChange={(v) => set("required", !!v)}
                />
                <Label>Required</Label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={!!f.monotonic}
                onCheckedChange={(v) => set("monotonic", !!v)}
              />
              <Label>Monotonic</Label>
            </div>

            <div>
              <Label>Help text</Label>
              <Input
                value={f.help ?? ""}
                onChange={(e) => set("help", e.target.value)}
              />
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-2">Depot Config Editor</h1>
      <div className="text-sm text-gray-600 mb-4">Depot ID: {depotId}</div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_380px] gap-4">
        {/* Structure */}
        <Card>
          <CardHeader>
            <CardTitle>Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={cfg.title}
                  onChange={(e) => setCfg({ ...cfg, title: e.target.value })}
                />
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Sections</div>
                  <Button size="sm" onClick={addSection}>
                    Add
                  </Button>
                </div>
                <ScrollArea className="h-[60vh] pr-2">
                  {cfg.sections.map((s, sIdx) => (
                    <div key={sIdx} className="mb-3 border rounded p-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-semibold">{s.label}</div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelected({ type: "section", sIdx })}
                        >
                          Edit
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => addGroup(sIdx)}
                      >
                        Add group
                      </Button>
                      <div className="mt-2 space-y-2">
                        {s.groups.map((g, gIdx) => (
                          <div key={gIdx} className="rounded border p-2">
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm">{g.label}</div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  setSelected({ type: "group", sIdx, gIdx })
                                }
                              >
                                Edit
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addField(sIdx, gIdx)}
                            >
                              Add field
                            </Button>
                            <ul className="mt-1 text-xs text-gray-600 list-disc pl-4">
                              {g.items.map((f, fIdx) => (
                                <li
                                  key={fIdx}
                                  className="flex items-center justify-between"
                                >
                                  <span>
                                    {f.label}{" "}
                                    <span className="text-gray-500">
                                      ({f.key})
                                    </span>
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      setSelected({
                                        type: "field",
                                        sIdx,
                                        gIdx,
                                        fIdx,
                                      })
                                    }
                                  >
                                    Edit
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {cfg.sections.map((s, sIdx) => (
                <div key={sIdx}>
                  <div className="text-lg font-semibold mb-2">{s.label}</div>
                  {s.groups.map((g, gIdx) => (
                    <div key={gIdx} className="mb-4">
                      <div className="text-sm font-medium mb-2">{g.label}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {g.items.map((f, i) => (
                          <div key={i}>
                            <label className="text-xs text-gray-600">
                              {f.label}
                            </label>
                            <Input type="number" placeholder={f.unit ?? ""} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspector */}
        <Card>
          <CardHeader>
            <CardTitle>Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderInspector()}
            <Separator />
            <Button onClick={saveDraft} disabled={saving}>
              {saving ? "Saving…" : "Save draft"}
            </Button>
            {issues.length > 0 && (
              <ul className="text-xs text-red-600 list-disc pl-4">
                {issues.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

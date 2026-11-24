import { useState, type ReactNode } from "react";
import homeActiveIcon from "../../../assets/icons/home-active.svg";
import homeIcon from "../../../assets/icons/home.svg";
import meatballIcon from "../../../assets/icons/meatball.svg";
import myActiveIcon from "../../../assets/icons/my-active.svg";
import myIcon from "../../../assets/icons/my.svg";
import searchIcon from "../../../assets/icons/search.svg";
import { ActionButton } from "@/design-system/ActionButton";
import { ApplicantListItem } from "@/design-system/ApplicantListItem";
import { Badge } from "@/design-system/Badge";
import { BottomCTA } from "@/design-system/BottomCTA";
import { BottomNavItem } from "@/design-system/BottomNavItem";
import { BottomSheet } from "@/design-system/BottomSheet";
import { Calendar } from "@/design-system/Calendar";
import { CarouselIndicator } from "@/design-system/CarouselIndicator";
import { CascadingMenu } from "@/design-system/CascadingMenu";
import { Checkbox } from "@/design-system/Checkbox";
import { DaySelector } from "@/design-system/DaySelector";
import { Dialog } from "@/design-system/Dialog";
import { Divider } from "@/design-system/Divider";
import { DropdownMenu } from "@/design-system/DropdownMenu";
import { FAB } from "@/design-system/FAB";
import { FilterChip } from "@/design-system/FilterChip";
import { GoalProgress } from "@/design-system/GoalProgress";
import { Header } from "@/design-system/Header";
import { IconButton } from "@/design-system/IconButton";
import { Notification } from "@/design-system/Notification";
import { NumberStepper } from "@/design-system/NumberStepper";
import { NumberWheel } from "@/design-system/NumberWheel";
import { Profile } from "@/design-system/Profile";
import { ProfileCard } from "@/design-system/ProfileCard";
import { ProgressBar } from "@/design-system/ProgressBar";
import {
  RangeSlider,
  type RangeSliderValue,
} from "@/design-system/RangeSlider";
import { SearchField } from "@/design-system/SearchField";
import { Select } from "@/design-system/Select";
import { SelectionChip } from "@/design-system/SelectionChip";
import { SheetHandle } from "@/design-system/SheetHandle";
import { SummaryBox } from "@/design-system/SummaryBox";
import { TextButton } from "@/design-system/TextButton";
import { TextInputField } from "@/design-system/TextInputField";
import { Toast } from "@/design-system/Toast";
import { Tooltip } from "@/design-system/Tooltip";
import { UploadZone } from "@/design-system/UploadZone";
import { dateAfter } from "@/features/example-matches/format";

function Demo({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-medium rounded-lg bg-neutral-default p-inset-large">
      <div className="flex flex-col gap-micro">
        <h3 className="typography-headline-bold m-0 text-fg-neutral-strong">
          {name}
        </h3>
        <code className="typography-caption-r-regular text-fg-neutral-tertiary">
          {`import { ${name} } from "@/design-system/${name}";`}
        </code>
      </div>
      <div className="flex flex-col gap-medium">{children}</div>
    </section>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-small">{children}</div>
  );
}

const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];
const nextDays = Array.from({ length: 14 }, (_, offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    id: dateAfter(offset),
    day: date.getDate(),
    weekday: weekdayLabels[date.getDay()],
    accessibleLabel: `${date.getMonth() + 1}월 ${date.getDate()}일`,
    today: offset === 0,
    hasEvent: offset % 4 === 2,
  };
});

const districts = [
  { id: "gangnam", label: "강남구" },
  { id: "songpa", label: "송파구" },
  { id: "mapo", label: "마포구" },
  { id: "jongno", label: "종로구" },
];

export function ComponentShowcase() {
  const [filterSelected, setFilterSelected] = useState(true);
  const [chipSelected, setChipSelected] = useState(false);
  const [chips, setChips] = useState([
    { id: "a", label: "단식" },
    { id: "b", label: "복식" },
  ]);
  const [checked, setChecked] = useState(true);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState(4);
  const [age, setAge] = useState(30);
  const [ntrp, setNtrp] = useState<RangeSliderValue>([2.5, 4]);
  const [date, setDate] = useState<string | null>(null);
  const [day, setDay] = useState(nextDays[0].id);
  const [selectedDistricts, setSelectedDistricts] = useState(["songpa"]);
  const [toast, setToast] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col gap-medium">
      <Demo name="ActionButton">
        <Row>
          <ActionButton>기본 S</ActionButton>
          <ActionButton size="M">기본 M</ActionButton>
          <ActionButton variant="secondary">보조</ActionButton>
          <ActionButton variant="tertiary">3순위</ActionButton>
          <ActionButton disabled>비활성</ActionButton>
        </Row>
        <ActionButton size="M" fullWidth>
          가득 찬 버튼 (fullWidth)
        </ActionButton>
      </Demo>

      <Demo name="BottomCTA">
        <BottomCTA primaryAction={{ children: "참가 신청하기" }} />
        <BottomCTA
          layout="horizontal"
          primaryAction={{ children: "다음" }}
          secondaryAction={{ children: "이전", variant: "tertiary" }}
        />
      </Demo>

      <Demo name="TextButton">
        <Row>
          <TextButton label="전체 보기" />
        </Row>
      </Demo>

      <Demo name="IconButton">
        <Row>
          <IconButton icon={searchIcon} aria-label="검색" />
          <IconButton icon={searchIcon} aria-label="검색" size="small" />
        </Row>
      </Demo>

      <Demo name="FAB">
        <Row>
          <FAB label="매치 열기" />
          <FAB label="매치 열기" collapsed />
        </Row>
      </Demo>

      <Demo name="Badge">
        <Row>
          <Badge>brand</Badge>
          <Badge variant="blue">blue</Badge>
          <Badge variant="blue-inverse">blue-inverse</Badge>
          <Badge variant="neutral">neutral</Badge>
        </Row>
      </Demo>

      <Demo name="FilterChip">
        <Row>
          <FilterChip
            label="NTRP 2.5~4.0"
            selected={filterSelected}
            onClick={() => setFilterSelected((value) => !value)}
          />
          <FilterChip label="지역" />
        </Row>
      </Demo>

      <Demo name="SelectionChip">
        <Row>
          <SelectionChip
            label="눌러서 선택"
            selected={chipSelected}
            onClick={() => setChipSelected((value) => !value)}
          />
          <SelectionChip label="선택됨" selected />
          <SelectionChip label="비활성" disabled />
          <SelectionChip label="지울 수 있는 칩" onRemove={() => {}} />
        </Row>
      </Demo>

      <Demo name="Checkbox">
        <label className="typography-body-regular flex items-center gap-small">
          <Checkbox
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
          이용약관에 동의합니다
        </label>
      </Demo>

      <Demo name="TextInputField">
        <TextInputField
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="닉네임을 입력해 주세요"
          caption="2~10자로 입력해 주세요"
        />
        <TextInputField
          defaultValue="이미 쓰는 닉네임"
          error="이미 사용 중인 닉네임이에요"
        />
        <TextInputField
          placeholder="인증번호"
          trailingAction={{ label: "확인", onClick: () => {} }}
        />
        <TextInputField defaultValue="비활성 입력" disabled />
      </Demo>

      <Demo name="SearchField">
        <SearchField
          value={search}
          onValueChange={setSearch}
          placeholder="코트 이름으로 검색"
        />
      </Demo>

      <Demo name="Select">
        <Select placeholder="선택해 주세요" />
        <Select value="송파구" />
        <Select
          chips={chips}
          onRemove={(id) =>
            setChips((current) => current.filter((chip) => chip.id !== id))
          }
        />
      </Demo>

      <Demo name="NumberStepper">
        <NumberStepper
          label="모집 인원"
          value={players}
          onChange={setPlayers}
          min={2}
          max={8}
        />
      </Demo>

      <Demo name="NumberWheel">
        <NumberWheel
          label="나이"
          unit="세"
          first={20}
          last={60}
          value={age}
          onChange={setAge}
        />
      </Demo>

      <Demo name="RangeSlider">
        <RangeSlider
          min={1}
          max={7}
          step={0.5}
          minLabel="최소 NTRP"
          maxLabel="최대 NTRP"
          formatValue={(value) => value.toFixed(1)}
          value={ntrp}
          onChange={setNtrp}
        />
      </Demo>

      <Demo name="ProgressBar">
        <ProgressBar currentStep={2} totalSteps={5} label="2/5 단계" />
      </Demo>

      <Demo name="GoalProgress">
        <GoalProgress current={3} goal={4} label="모집 현황" />
        <GoalProgress current={1} goal={4} label="모집 현황" tone="danger" />
      </Demo>

      <Demo name="CarouselIndicator">
        <CarouselIndicator currentPage={2} totalPages={4} />
      </Demo>

      <Demo name="Divider">
        <Divider />
        <Divider variant="thick" />
      </Demo>

      <Demo name="Profile">
        <Row>
          <Profile size="S" />
          <Profile size="M" />
          <Profile size="L" />
        </Row>
      </Demo>

      <Demo name="ProfileCard">
        <ProfileCard
          name="랠릿러"
          badge="NTRP 3.0"
          details={[
            { label: "구력", value: "2년" },
            { label: "활동 지역", value: "송파구" },
          ]}
          actions={{ onReject: () => {}, onAccept: () => {} }}
        />
      </Demo>

      <Demo name="ApplicantListItem">
        <ApplicantListItem
          name="랠릿러"
          description="NTRP 3.0 · 구력 2년"
          badge={{ label: "신청", variant: "blue" }}
        />
      </Demo>

      <Demo name="Notification">
        <Notification
          title="참가 신청이 수락됐어요"
          description="토요일 아침 복식 한 판"
          time="방금 전"
          isNew
        />
      </Demo>

      <Demo name="SummaryBox">
        <SummaryBox
          date="12월 5일 (토)"
          time="오전 9:00"
          region="송파구"
          matchType="복식"
        />
      </Demo>

      <Demo name="Calendar">
        <Calendar
          value={date}
          onChange={setDate}
          min={dateAfter(0)}
          max={dateAfter(60)}
        />
      </Demo>

      <Demo name="DaySelector">
        <DaySelector
          monthLabel={`${new Date().getMonth() + 1}월`}
          days={nextDays}
          selectedId={day}
          onSelect={setDay}
        />
      </Demo>

      <Demo name="CascadingMenu">
        <CascadingMenu
          options={districts}
          selectedIds={selectedDistricts}
          onToggle={(id) =>
            setSelectedDistricts((current) =>
              current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
            )
          }
        />
      </Demo>

      <Demo name="Header">
        <Header variant="logo" onNotifications={() => {}} />
        <Header variant="main" title="매치 현황" />
        <Header variant="subpage" title="매치 상세" onBack={() => {}} />
        <Header variant="sheet" title="참가 신청" onClose={() => {}} />
      </Demo>

      <Demo name="BottomNavItem">
        <nav className="flex justify-between border-t border-stroke-neutral-weak px-inset-extra-large">
          <BottomNavItem
            label="홈"
            href="/"
            icon={homeIcon}
            activeIcon={homeActiveIcon}
          />
          <BottomNavItem
            label="카탈로그"
            href="/design-system"
            icon={myIcon}
            activeIcon={myActiveIcon}
          />
        </nav>
      </Demo>

      <Demo name="Tooltip">
        <Tooltip>매치 시작 24시간 전까지 취소할 수 있어요</Tooltip>
      </Demo>

      <Demo name="UploadZone">
        <UploadZone caption="코트 예약 내역을 올려 주세요" />
      </Demo>

      <Demo name="SheetHandle">
        <SheetHandle />
      </Demo>

      <Demo name="Toast">
        <Row>
          <ActionButton
            variant="tertiary"
            onClick={() => setToast("저장했어요")}
          >
            토스트 띄우기
          </ActionButton>
        </Row>
        <Toast message={toast} onDismiss={() => setToast(null)} />
      </Demo>

      <Demo name="Dialog">
        <Row>
          <ActionButton variant="tertiary" onClick={() => setDialogOpen(true)}>
            다이얼로그 열기
          </ActionButton>
        </Row>
        <Dialog
          open={dialogOpen}
          title="매치를 취소할까요?"
          description="취소하면 참가자에게 알림이 가요."
          confirmLabel="취소하기"
          cancelLabel="닫기"
          onConfirm={() => setDialogOpen(false)}
          onCancel={() => setDialogOpen(false)}
        />
      </Demo>

      <Demo name="BottomSheet">
        <Row>
          <ActionButton variant="tertiary" onClick={() => setSheetOpen(true)}>
            바텀시트 열기
          </ActionButton>
        </Row>
        <BottomSheet
          id="catalog-sheet"
          title="참가 신청"
          open={sheetOpen}
          onDismiss={() => setSheetOpen(false)}
        >
          {(dismiss) => (
            <div className="flex flex-col gap-large px-inset-large py-inset-medium">
              <SummaryBox
                date="12월 5일 (토)"
                time="오전 9:00"
                region="송파구"
                matchType="복식"
              />
              <ActionButton size="M" fullWidth onClick={() => dismiss()}>
                신청하기
              </ActionButton>
            </div>
          )}
        </BottomSheet>
      </Demo>

      <Demo name="DropdownMenu">
        <div className="relative flex justify-end">
          <IconButton
            icon={meatballIcon}
            aria-label="더보기"
            onClick={() => setMenuOpen(true)}
          />
          <DropdownMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            className="top-full right-0"
            items={[
              { label: "수정하기", onSelect: () => {} },
              { label: "삭제하기", onSelect: () => {}, tone: "danger" },
            ]}
          />
        </div>
      </Demo>
    </div>
  );
}

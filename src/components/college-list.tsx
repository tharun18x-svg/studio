"use client";

import { useState, useMemo, type FC } from "react";
import type { College, Category, FilterCategory } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, Sparkles } from "lucide-react";
import { PersonalizedInsightsDialog } from "./personalized-insights-dialog";

interface CollegeListProps {
  colleges: College[];
}

type SortKey = "ranking" | "highestPackage";

export default function CollegeList({ colleges }: CollegeListProps) {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<FilterCategory>("ALL");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "ranking", direction: "ascending" });
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const sortedAndFilteredColleges = useMemo(() => {
    let filteredColleges =
      filter === "ALL"
        ? [...colleges]
        : colleges.filter(() => true); // In a real scenario, you'd filter based on a property

    if (sortConfig !== null) {
      filteredColleges.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredColleges;
  }, [colleges, filter, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === "ascending" ? "🔼" : "🔽";
  };

  const categories: FilterCategory[] = ["ALL", "OC", "MBC", "BC", "BCM", "SC"];

  const handleGetInsightsClick = (college: College) => {
    setSelectedCollege(college);
  };

  return (
    <div className="w-full">
      <div className="mb-6 p-4 bg-card rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
        <RadioGroup
          defaultValue="ALL"
          className="flex flex-wrap gap-4"
          onValueChange={(value: FilterCategory) => setFilter(value)}
        >
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={category} />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {isMobile ? (
        <MobileView
          colleges={sortedAndFilteredColleges}
          filter={filter}
          onGetInsights={handleGetInsightsClick}
        />
      ) : (
        <DesktopView
          colleges={sortedAndFilteredColleges}
          filter={filter}
          sortConfig={sortConfig}
          requestSort={requestSort}
          getSortIndicator={getSortIndicator}
          onGetInsights={handleGetInsightsClick}
        />
      )}

      {selectedCollege && (
        <PersonalizedInsightsDialog
          college={selectedCollege}
          filterCategory={filter}
          open={!!selectedCollege}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedCollege(null);
            }
          }}
        />
      )}
    </div>
  );
}

const HighlightBadge: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Badge
    variant="outline"
    className="bg-green-100 text-green-800 border-green-300 font-medium"
    style={{ backgroundColor: "#90EE9030", color: "#006400", borderColor: "#90EE90" }}
  >
    {children}
  </Badge>
);

const DesktopView = ({ colleges, filter, sortConfig, requestSort, getSortIndicator, onGetInsights }: any) => (
  <Card>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>College</TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort("ranking")}>
              Rank {getSortIndicator("ranking")}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort("highestPackage")}>
              Highest Package {getSortIndicator("highestPackage")}
            </Button>
          </TableHead>
          <TableHead className="text-center">
            {filter !== 'ALL' ? `${filter} Cutoff` : 'Cutoff'}
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colleges.map((college: College) => (
          <TableRow key={college.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="font-medium">{college.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">{college.ranking}</TableCell>
            <TableCell className="text-center">
              <HighlightBadge>{college.highestPackage} LPA</HighlightBadge>
            </TableCell>
            <TableCell className="text-center">
              {filter !== 'ALL' && <HighlightBadge>{college.cutoffs[filter as Category]}</HighlightBadge>}
              {filter === 'ALL' && <span className="text-muted-foreground">Select a category</span>}
            </TableCell>
            <TableCell className="text-right">
              <Button onClick={() => onGetInsights(college)}>
                <Sparkles className="mr-2 h-4 w-4" /> Get Insights
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

const MobileView = ({ colleges, filter, onGetInsights }: any) => (
  <div className="grid gap-4">
    {colleges.map((college: College) => (
      <Card key={college.id} className="w-full">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div>
              <CardTitle>{college.name}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="text-center p-2 rounded-md bg-secondary">
            <p className="text-sm text-muted-foreground">Rank</p>
            <p className="text-lg font-bold">{college.ranking}</p>
          </div>
          <div className="text-center p-2 rounded-md bg-secondary">
            <p className="text-sm text-muted-foreground">Highest Package</p>
            <HighlightBadge>{college.highestPackage} LPA</HighlightBadge>
          </div>
          <div className="text-center p-2 rounded-md bg-secondary col-span-2">
            <p className="text-sm text-muted-foreground">
              {filter !== 'ALL' ? `${filter} Cutoff` : 'Cutoff'}
            </p>
            {filter !== 'ALL' ? (
              <HighlightBadge>{college.cutoffs[filter as Category]}</HighlightBadge>
            ) : (
               <span className="text-sm text-muted-foreground">Select category</span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => onGetInsights(college)}>
            <Sparkles className="mr-2 h-4 w-4" /> Get Insights
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
);

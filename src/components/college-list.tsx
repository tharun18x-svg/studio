"use client";

import { useState, useMemo, type FC, Fragment } from "react";
import type { College, Category, FilterCategory, Course } from "@/lib/types";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { PersonalizedInsightsDialog } from "./personalized-insights-dialog";

interface CollegeListProps {
  colleges: College[];
}

type SortKey = "ranking" | "highestPackage" | "code";

export default function CollegeList({ colleges }: CollegeListProps) {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<FilterCategory>("ALL");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "ranking", direction: "ascending" });
  const [selectedCourse, setSelectedCourse] = useState<{ college: College, course: Course } | null>(null);
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<number, boolean>>({});

  const toggleCollapsible = (collegeId: number) => {
    setOpenCollapsibles(prev => ({ ...prev, [collegeId]: !prev[collegeId] }));
  };

  const sortedAndFilteredColleges = useMemo(() => {
    let filteredColleges = [...colleges];

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
  }, [colleges, sortConfig]);

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

  const handleGetInsightsClick = (college: College, course: Course) => {
    setSelectedCourse({ college, course });
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
          openCollapsibles={openCollapsibles}
          toggleCollapsible={toggleCollapsible}
        />
      ) : (
        <DesktopView
          colleges={sortedAndFilteredColleges}
          filter={filter}
          sortConfig={sortConfig}
          requestSort={requestSort}
          getSortIndicator={getSortIndicator}
          onGetInsights={handleGetInsightsClick}
          openCollapsibles={openCollapsibles}
          toggleCollapsible={toggleCollapsible}
        />
      )}

      {selectedCourse && (
        <PersonalizedInsightsDialog
          college={selectedCourse.college}
          course={selectedCourse.course}
          filterCategory={filter}
          open={!!selectedCourse}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedCourse(null);
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

const DesktopView = ({ colleges, filter, sortConfig, requestSort, getSortIndicator, onGetInsights, openCollapsibles, toggleCollapsible }: any) => (
  <Card>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>College</TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort("code")}>
              Code {getSortIndicator("code")}
            </Button>
          </TableHead>
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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colleges.map((college: College) => (
          <Collapsible asChild key={college.id} open={openCollapsibles[college.id]} onOpenChange={() => toggleCollapsible(college.id)}>
            <Fragment>
              <TableRow className="border-b-0">
                <TableCell>
                   <CollapsibleTrigger asChild>
                      <button className="flex items-center gap-3 text-left">
                        <span className="font-medium">{college.name}</span>
                        {openCollapsibles[college.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </CollapsibleTrigger>
                </TableCell>
                <TableCell className="text-center">{college.code}</TableCell>
                <TableCell className="text-center">{college.ranking}</TableCell>
                <TableCell className="text-center">
                  <HighlightBadge>{college.highestPackage} LPA</HighlightBadge>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <CollapsibleContent asChild>
                <tr className="bg-muted/50">
                  <td colSpan={5}>
                      <div className="p-4">
                          <h4 className="font-semibold mb-2 text-primary">Available Courses</h4>
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Course Name</TableHead>
                                      <TableHead className="text-center">
                                          {filter !== 'ALL' ? `${filter} Cutoff` : 'Cutoff'}
                                      </TableHead>
                                      <TableHead></TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {college.courses.map(course => (
                                      <TableRow key={course.id}>
                                          <TableCell>{course.name}</TableCell>
                                          <TableCell className="text-center">
                                              {filter !== 'ALL' && <HighlightBadge>{course.cutoffs[filter as Category]}</HighlightBadge>}
                                              {filter === 'ALL' && <span className="text-muted-foreground">Select a category</span>}
                                          </TableCell>
                                          <TableCell className="text-right">
                                              <Button onClick={() => onGetInsights(college, course)}>
                                                  <Sparkles className="mr-2 h-4 w-4" /> Get Insights
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </div>
                  </td>
                </tr>
              </CollapsibleContent>
            </Fragment>
          </Collapsible>
        ))}
      </TableBody>
    </Table>
  </Card>
);

const MobileView = ({ colleges, filter, onGetInsights, openCollapsibles, toggleCollapsible }: any) => (
  <div className="grid gap-4">
    {colleges.map((college: College) => (
       <Collapsible key={college.id} asChild open={openCollapsibles[college.id]} onOpenChange={() => toggleCollapsible(college.id)}>
        <Card className="w-full">
            <CardHeader>
                <CollapsibleTrigger>
                    <div className="flex justify-between items-start gap-4">
                        <div>
                        <CardTitle>{college.name}</CardTitle>
                        </div>
                        {openCollapsibles[college.id] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                </CollapsibleTrigger>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
            <div className="text-center p-2 rounded-md bg-secondary">
                <p className="text-sm text-muted-foreground">Code</p>
                <p className="text-lg font-bold">{college.code}</p>
            </div>
            <div className="text-center p-2 rounded-md bg-secondary">
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-lg font-bold">{college.ranking}</p>
            </div>
            <div className="col-span-2 text-center p-2 rounded-md bg-secondary">
                <p className="text-sm text-muted-foreground">Highest Package</p>
                <HighlightBadge>{college.highestPackage} LPA</HighlightBadge>
            </div>
            </CardContent>
             <CollapsibleContent>
                <CardContent>
                     <h4 className="font-semibold mb-2 text-primary text-center">Available Courses</h4>
                    <div className="grid gap-4">
                        {college.courses.map((course: Course) => (
                            <Card key={course.id} className="bg-background">
                                <CardHeader>
                                    <CardTitle className="text-base">{course.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center p-2 rounded-md bg-secondary">
                                        <p className="text-sm text-muted-foreground">
                                        {filter !== 'ALL' ? `${filter} Cutoff` : 'Cutoff'}
                                        </p>
                                        {filter !== 'ALL' ? (
                                        <HighlightBadge>{course.cutoffs[filter as Category]}</HighlightBadge>
                                        ) : (
                                        <span className="text-sm text-muted-foreground">Select category</span>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => onGetInsights(college, course)}>
                                        <Sparkles className="mr-2 h-4 w-4" /> Get Insights
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
             </CollapsibleContent>
        </Card>
      </Collapsible>
    ))}
  </div>
);
